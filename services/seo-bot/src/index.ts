import { Bot, Context, session, type SessionFlavor } from "grammy";
import { config } from "./config.js";
import {
  getManager,
  listArticles,
  getArticle,
  getHistory,
  enqueueEnrichment,
  enqueueGeneration,
  addPendingEdit,
  listPendingEdits,
  clearPendingEdits,
  type Manager,
} from "./db.js";
import { transcribe } from "./transcribe.js";
import { T, formatHistory } from "./messages.js";
import {
  mainMenu,
  articleList,
  articleActions,
  confirmNote,
  moreOrFinish,
  genCounts,
} from "./keyboards.js";

interface SessionData {
  stage: "idle" | "awaiting_note" | "confirm_note";
  slug?: string;
  title?: string;
  pendingNote?: string;
}

type Ctx = Context & SessionFlavor<SessionData> & { manager: Manager };

const bot = new Bot<Ctx>(config.botToken);

// В группе уведомлений бот только постит итоги генерации (это делает сервис
// фабрики) и НЕ реагирует на входящие — иначе чужие реплики в группе он
// принимает за запросы. Игнорируем любые апдейты из этого чата ещё до
// allowlist'а, чтобы не плодить и ответы T.denied. Остальные чаты — как обычно.
bot.use(async (ctx, next) => {
  if (config.notifyGroupId && String(ctx.chat?.id) === config.notifyGroupId) return;
  await next();
});

bot.use(
  session<SessionData, Ctx>({
    initial: () => ({ stage: "idle" }),
  }),
);

// --- Аллоулист: всё, что не от менеджера, отсекается здесь ---
bot.use(async (ctx, next) => {
  const id = ctx.from?.id;
  if (!id) return;
  const manager = await getManager(id);
  if (!manager) {
    if (ctx.callbackQuery) await ctx.answerCallbackQuery();
    await ctx.reply(T.denied);
    return;
  }
  ctx.manager = manager;
  await next();
});

const isOwner = (ctx: Ctx) => ctx.manager.role === "owner";

bot.command("start", async (ctx) => {
  ctx.session = { stage: "idle" };
  await ctx.reply(T.start(ctx.manager.name), { reply_markup: mainMenu(isOwner(ctx)) });
});

// Владелец может заказать генерацию командой: /generate 50
bot.command("generate", async (ctx) => {
  if (!isOwner(ctx)) return ctx.reply(T.ownerOnly);
  const n = parseInt((ctx.match || "").trim(), 10);
  if (!Number.isFinite(n) || n < 1 || n > 100) {
    return ctx.reply(T.genMenu, { reply_markup: genCounts() });
  }
  await enqueueGeneration({
    count: n,
    managerId: ctx.manager.telegram_id,
    managerName: ctx.manager.name,
  });
  await ctx.reply(T.genQueued(n));
});

// ---------- Callback-кнопки ----------
async function showArticleList(ctx: Ctx, page: number) {
  const items = await listArticles();
  if (items.length === 0) {
    await ctx.reply(T.noArticles);
    return;
  }
  const opts = { reply_markup: articleList(items, page) };
  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(T.pickArticle, opts).catch(() => ctx.reply(T.pickArticle, opts));
  } else {
    await ctx.reply(T.pickArticle, opts);
  }
}

bot.callbackQuery("noop", (ctx) => ctx.answerCallbackQuery());

bot.callbackQuery(/^menu:articles:(\d+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  await showArticleList(ctx, Number(ctx.match![1]));
});

bot.callbackQuery(/^pg:(\d+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  await showArticleList(ctx, Number(ctx.match![1]));
});

bot.callbackQuery(/^pick:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const slug = ctx.match![1];
  const article = await getArticle(slug);
  if (!article) return ctx.reply(T.noArticles);
  const history = await getHistory(slug);
  ctx.session = { stage: "idle", slug, title: article.title_ru };
  await ctx.reply(formatHistory(article.title_ru, history), {
    parse_mode: "HTML",
    reply_markup: articleActions(),
  });
});

bot.callbackQuery("addnote", async (ctx) => {
  await ctx.answerCallbackQuery();
  if (!ctx.session.slug) return ctx.reply(T.sendVoiceFirst);
  ctx.session.stage = "awaiting_note";
  await ctx.reply(T.awaitingNote(ctx.session.title ?? ctx.session.slug), {
    parse_mode: "HTML",
  });
});

bot.callbackQuery("menu:gen", async (ctx) => {
  await ctx.answerCallbackQuery();
  if (!isOwner(ctx)) return;
  await ctx.reply(T.genMenu, { reply_markup: genCounts() });
});

bot.callbackQuery(/^gen:(\d+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  if (!isOwner(ctx)) return;
  const n = Number(ctx.match![1]);
  await enqueueGeneration({
    count: n,
    managerId: ctx.manager.telegram_id,
    managerName: ctx.manager.name,
  });
  await ctx.reply(T.genQueued(n));
});

// Подтверждение правки → копим в черновик (НЕ отправляем сразу)
bot.callbackQuery("note:send", async (ctx) => {
  await ctx.answerCallbackQuery();
  const { slug, pendingNote } = ctx.session;
  if (!slug || !pendingNote) return ctx.reply(T.sendVoiceFirst);
  await addPendingEdit(ctx.manager.telegram_id, slug, pendingNote);
  const count = (await listPendingEdits(ctx.manager.telegram_id, slug)).length;
  ctx.session.pendingNote = undefined;
  ctx.session.stage = "awaiting_note";
  await ctx.reply(T.noteAdded(count), { reply_markup: moreOrFinish() });
});

bot.callbackQuery("note:redo", async (ctx) => {
  await ctx.answerCallbackQuery();
  ctx.session.stage = "awaiting_note";
  ctx.session.pendingNote = undefined;
  await ctx.reply(T.reRecord);
});

bot.callbackQuery("note:cancel", async (ctx) => {
  await ctx.answerCallbackQuery();
  ctx.session.pendingNote = undefined;
  ctx.session.stage = "awaiting_note";
  await ctx.reply(T.cancelled);
});

// ---------- Завершение правок по статье (/end) ----------
async function finalize(ctx: Ctx) {
  const slug = ctx.session.slug;
  if (!slug) return ctx.reply(T.nothingToFinish);
  const notes = await listPendingEdits(ctx.manager.telegram_id, slug);
  if (notes.length === 0) return ctx.reply(T.nothingToFinish);
  const combined = notes.map((n, i) => `${i + 1}) ${n}`).join("\n");
  await enqueueEnrichment({
    slug,
    note: combined,
    managerId: ctx.manager.telegram_id,
    managerName: ctx.manager.name,
  });
  await clearPendingEdits(ctx.manager.telegram_id, slug);
  ctx.session = { stage: "idle" };
  await ctx.reply(T.finished(notes.length));
}

async function discardEdits(ctx: Ctx) {
  if (ctx.session.slug) await clearPendingEdits(ctx.manager.telegram_id, ctx.session.slug);
  ctx.session = { stage: "idle" };
  await ctx.reply(T.discarded);
}

bot.command("end", (ctx) => finalize(ctx));
bot.command("cancel", (ctx) => discardEdits(ctx));
bot.callbackQuery("finish", async (ctx) => {
  await ctx.answerCallbackQuery();
  await finalize(ctx);
});
bot.callbackQuery("discard", async (ctx) => {
  await ctx.answerCallbackQuery();
  await discardEdits(ctx);
});

// ---------- Приём дополнения (голос или текст) ----------
async function presentNote(ctx: Ctx, note: string) {
  if (!note) return ctx.reply(T.transcribeFailed);
  ctx.session.pendingNote = note;
  ctx.session.stage = "confirm_note";
  await ctx.reply(T.confirmNote(note), { reply_markup: confirmNote() });
}

bot.on("message:voice", async (ctx) => {
  if (ctx.session.stage !== "awaiting_note") return ctx.reply(T.sendVoiceFirst);
  await ctx.reply(T.transcribing);
  try {
    const file = await ctx.getFile();
    const url = `https://api.telegram.org/file/bot${config.botToken}/${file.file_path}`;
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    const note = await transcribe(buf, "voice.ogg");
    await presentNote(ctx, note);
  } catch (e) {
    console.error("transcribe error", e);
    await ctx.reply(T.transcribeFailed);
  }
});

bot.on("message:text", async (ctx) => {
  if (ctx.message.text.startsWith("/")) return; // команды обрабатываются выше
  if (ctx.session.stage !== "awaiting_note") return; // вне сценария — игнор
  await presentNote(ctx, ctx.message.text.trim());
});

bot.catch((err) => console.error("Bot error:", err.error));

bot.start({
  onStart: (me) => console.log(`SEO-bot запущен: @${me.username}`),
});

import { InlineKeyboard } from "grammy";
import type { ArticleRow } from "./db.js";

const PAGE = 18;

/** Главное меню. Кнопка генерации — только владельцу. */
export function mainMenu(isOwner: boolean): InlineKeyboard {
  const kb = new InlineKeyboard().text("✍️ Дополнить статью", "menu:articles:0");
  // Голосовой заказ одной статьи — доступен всем менеджерам.
  kb.row().text("🎙 Заказать статью голосом", "menu:gentopic");
  // Массовый заказ N статей — только владельцу.
  if (isOwner) kb.row().text("🏭 Заказать новые статьи", "menu:gen");
  return kb;
}

/** Пагинированный список статей. callback: pick:<slug> | pg:<n> */
export function articleList(items: ArticleRow[], page: number): InlineKeyboard {
  const kb = new InlineKeyboard();
  const start = page * PAGE;
  const slice = items.slice(start, start + PAGE);
  for (const a of slice) {
    // Telegram не переносит текст в кнопке — отдаём максимум места заголовку,
    // статус показываем компактной точкой: 🟢 — есть обновление, ⚪️ — нет.
    const mark = a.last_update ? "🟢" : "⚪️";
    const title = a.title_ru.length > 52 ? a.title_ru.slice(0, 51) + "…" : a.title_ru;
    kb.text(`${mark} ${title}`, `pick:${a.slug}`).row();
  }
  const pages = Math.max(1, Math.ceil(items.length / PAGE));
  const nav: { t: string; d: string }[] = [];
  if (page > 0) nav.push({ t: "‹ Назад", d: `pg:${page - 1}` });
  nav.push({ t: `${page + 1}/${pages}`, d: "noop" });
  if (start + PAGE < items.length) nav.push({ t: "Вперёд ›", d: `pg:${page + 1}` });
  for (const n of nav) kb.text(n.t, n.d);
  return kb;
}

/** Экран статьи: дополнить или назад к списку. */
export function articleActions(): InlineKeyboard {
  return new InlineKeyboard()
    .text("🎙 Добавить правки", "addnote")
    .row()
    .text("‹ К списку", "menu:articles:0");
}

/** Подтверждение расшифровки одной правки. */
export function confirmNote(): InlineKeyboard {
  return new InlineKeyboard()
    .text("✅ Добавить правку", "note:send")
    .row()
    .text("🔁 Перезаписать", "note:redo")
    .text("✖️ Отмена правки", "note:cancel");
}

/** После добавления правки: записать ещё или завершить/отменить. */
export function moreOrFinish(): InlineKeyboard {
  return new InlineKeyboard()
    .text("✅ Завершить и отправить", "finish")
    .row()
    .text("🗑 Отменить все правки", "discard");
}

/** Подтверждение темы для генерации одной статьи (голосом/текстом). */
export function confirmTopic(): InlineKeyboard {
  return new InlineKeyboard()
    .text("✅ Заказать статью", "topic:send")
    .row()
    .text("🔁 Перезаписать", "topic:redo")
    .text("✖️ Отмена", "topic:cancel");
}

/** Пресеты количества статей для генерации. */
export function genCounts(): InlineKeyboard {
  return new InlineKeyboard()
    .text("10", "gen:10")
    .text("25", "gen:25")
    .text("50", "gen:50");
}

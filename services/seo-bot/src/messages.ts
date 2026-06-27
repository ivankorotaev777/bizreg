import type { ArticleRow, UpdateRow } from "./db.js";

export const T = {
  denied:
    "Доступ только для менеджеров BizReg. Если вам нужен доступ — попросите владельца добавить ваш Telegram ID в список.",
  start: (name: string) =>
    `Привет, ${name}! Это рабочий бот BizReg.\n\n` +
    `Здесь можно дополнить статью блога: выберите статью, наговорите голосом, что добавить — ` +
    `я передам это в редакционный завод. Завод сам расширит статью по стандарту, проверит факты, ` +
    `опубликует и пришлёт уведомление в общую группу.`,
  pickArticle: "Выберите статью для дополнения:",
  noArticles:
    "Список статей ещё не синхронизирован. Подождите, пока завод выполнит первую синхронизацию, и нажмите /start.",
  awaitingNote: (title: string) =>
    `📄 <b>${esc(title)}</b>\n\nЗапишите голосовое сообщение с тем, что нужно добавить или уточнить ` +
    `(можно и текстом). Я расшифрую и покажу для подтверждения.`,
  transcribing: "🎧 Расшифровываю голосовое…",
  confirmNote: (note: string) =>
    `Вот что я расслышал:\n\n«${esc(note)}»\n\nОтправить это в работу?`,
  queued:
    "✅ Принято. Завод обновит статью по стандарту и пришлёт уведомление в общую группу. " +
    "Можно выбрать следующую статью через /start.",
  cancelled: "Отменено. /start — начать заново.",
  reRecord: "Хорошо, запишите голосовое заново.",
  transcribeFailed:
    "Не удалось расшифровать аудио. Попробуйте записать ещё раз или отправьте текстом.",
  sendVoiceFirst: "Сначала выберите статью через /start, потом запишите голосовое.",
  // Генерация (владелец)
  genMenu: "Сколько новых статей заказать заводу?",
  genQueued: (n: number) =>
    `✅ Заказано ${n} статей. Завод сгенерирует их по стандарту, проверит и опубликует. ` +
    `Уведомления придут в общую группу.`,
  ownerOnly: "Эта команда доступна только владельцу.",
};

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Бейдж даты последнего обновления для строки статьи. */
export function badge(a: ArticleRow): string {
  if (!a.last_update) return "⚪️ нет обновл.";
  const d = new Date(a.last_update);
  return `🟢 ${d.toLocaleDateString("ru-RU")}`;
}

export function formatHistory(title: string, rows: UpdateRow[]): string {
  if (rows.length === 0) {
    return `📄 <b>${esc(title)}</b>\n\nИстория обновлений: <i>нет обновлений</i>.`;
  }
  const lines = rows.slice(0, 15).map((r) => {
    const d = new Date(r.created_at).toLocaleDateString("ru-RU");
    const who = r.manager_name ? ` · ${esc(r.manager_name)}` : "";
    const what = r.summary ? `: ${esc(r.summary)}` : "";
    return `• ${d}${who}${what}`;
  });
  const more = rows.length > 15 ? `\n…и ещё ${rows.length - 15}` : "";
  return `📄 <b>${esc(title)}</b>\n\nИстория обновлений:\n${lines.join("\n")}${more}`;
}

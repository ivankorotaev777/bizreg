import { config } from "./config.js";

/** Отправляет сообщение в общую Telegram-группу (в ветку, если задан topicId). */
export async function notifyGroup(text: string): Promise<void> {
  try {
    const body: Record<string, unknown> = {
      chat_id: config.groupId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: false,
    };
    if (config.topicId) body.message_thread_id = Number(config.topicId);
    const res = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error("notifyGroup failed", res.status, await res.text());
  } catch (e) {
    console.error("notifyGroup error", e);
  }
}

/** Личное уведомление заказчику (например, при ошибке генерации). */
export async function notifyUser(userId: number | null, text: string): Promise<void> {
  if (!userId) return;
  try {
    await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: userId, text }),
    });
  } catch (e) {
    console.error("notifyUser error", e);
  }
}

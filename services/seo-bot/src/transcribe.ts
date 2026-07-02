import { config } from "./config.js";

/**
 * Расшифровывает голосовое Telegram (OGG/Opus) в текст через OpenAI.
 * Используем НАТИВНЫЙ fetch/FormData (undici в Node 18+): у openai-SDK на Node 22
 * multipart-загрузка через node-fetch рвётся с "Premature close".
 * @param audio  бинарные данные файла
 * @param filename  имя с расширением (например "voice.ogg")
 */
export async function transcribe(audio: Buffer, filename = "voice.ogg"): Promise<string> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const form = new FormData();
      form.append("file", new Blob([audio]), filename);
      form.append("model", config.sttModel);
      form.append("language", "ru"); // основной язык менеджеров; модель всё равно автоопределяет
      const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: { Authorization: `Bearer ${config.openaiKey}` },
        body: form,
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`OpenAI ${res.status}: ${body.slice(0, 300)}`);
      }
      const data = (await res.json()) as { text?: string };
      return (data.text ?? "").trim();
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
  }
  throw lastErr;
}

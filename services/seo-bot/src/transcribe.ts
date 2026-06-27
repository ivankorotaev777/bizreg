import OpenAI, { toFile } from "openai";
import { config } from "./config.js";

// Транскрипция изолирована в одном модуле — при желании легко заменить
// на Yandex SpeechKit / Deepgram, не трогая остальной код бота.
const openai = new OpenAI({ apiKey: config.openaiKey });

/**
 * Расшифровывает голосовое сообщение Telegram (OGG/Opus) в текст.
 * @param audio  бинарные данные файла
 * @param filename  имя с расширением (например "voice.ogg")
 */
export async function transcribe(audio: Buffer, filename = "voice.ogg"): Promise<string> {
  const file = await toFile(audio, filename);
  const res = await openai.audio.transcriptions.create({
    file,
    model: config.sttModel,
    language: "ru", // основной язык менеджеров; Whisper всё равно автоопределяет
  });
  return res.text.trim();
}

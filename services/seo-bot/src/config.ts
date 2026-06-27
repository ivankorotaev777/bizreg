// Конфиг из переменных окружения. Никаких секретов в коде — только Railway env.
function req(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Не задана переменная окружения ${name}`);
  return v;
}

export const config = {
  botToken: req("BOT_TOKEN"),
  // Строка подключения к Postgres (Railway Postgres — переменная DATABASE_URL).
  databaseUrl: req("DATABASE_URL"),
  openaiKey: req("OPENAI_API_KEY"), // для транскрипции голосовых (Whisper)
  siteUrl: process.env.SITE_URL ?? "https://www.bizreg.uz",
  // Модель транскрипции. whisper-1 — дёшево и хорошо для русского.
  sttModel: process.env.STT_MODEL ?? "whisper-1",
};

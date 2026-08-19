function req(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Не задана переменная окружения ${name}`);
  return v;
}

export const config = {
  // Claude Agent SDK берёт ключ из ANTHROPIC_API_KEY автоматически —
  // просто проверяем, что он задан.
  anthropicKey: req("ANTHROPIC_API_KEY"),
  // Дополнения готового текста — на Sonnet (дешевле, качества хватает).
  // Генерация новых статей с нуля — на Opus (максимальное качество).
  enrichModel: process.env.ENRICH_MODEL ?? "claude-sonnet-4-6",
  genModel: process.env.GEN_MODEL ?? process.env.MODEL ?? "claude-opus-4-8",

  // Postgres (Railway Postgres → DATABASE_URL). Тот же сервис БД, что у бота.
  databaseUrl: req("DATABASE_URL"),

  // GitHub — источник правды для контента. Завод клонирует, пишет, пушит в main.
  githubToken: req("GITHUB_TOKEN"),
  githubRepo: req("GITHUB_REPO"), // формат: "owner/bizreg"
  gitBranch: process.env.GIT_BRANCH ?? "main",
  gitAuthorName: process.env.GIT_AUTHOR_NAME ?? "BizReg Factory",
  gitAuthorEmail: process.env.GIT_AUTHOR_EMAIL ?? "factory@bizreg.uz",

  // Telegram — уведомления в общую группу при публикации/обновлении.
  botToken: req("BOT_TOKEN"),
  groupId: req("TELEGRAM_GROUP_ID"), // ID общей группы (отрицательное число)
  topicId: process.env.TELEGRAM_TOPIC_ID, // ID ветки (topic) в супергруппе — необязательно

  siteUrl: process.env.SITE_URL ?? "https://www.bizreg.uz",
  workdir: process.env.WORKDIR ?? "./.workrepo",
  writerConcurrency: Number(process.env.WRITER_CONCURRENCY ?? 3),
  pollIntervalMs: Number(process.env.POLL_INTERVAL_MS ?? 10000),
  maxFixAttempts: Number(process.env.MAX_FIX_ATTEMPTS ?? 2),

  // Факт-чек-ревью (второй гейт после audit:blog): сверка цифр/норм с Tier-1.
  // Дорогой шаг (Opus + web), поэтому запускается только на статьях, прошедших audit:blog.
  reviewEnabled: process.env.REVIEW_ENABLED !== "0",
  reviewModel: process.env.REVIEW_MODEL ?? "claude-opus-4-8",
  maxReviewAttempts: Number(process.env.MAX_REVIEW_ATTEMPTS ?? 2),

  get repoUrl() {
    return `https://x-access-token:${this.githubToken}@github.com/${this.githubRepo}.git`;
  },
};

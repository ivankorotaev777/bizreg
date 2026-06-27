function req(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Не задана переменная окружения ${name}`);
  return v;
}

export const config = {
  // Claude Agent SDK берёт ключ из ANTHROPIC_API_KEY автоматически —
  // просто проверяем, что он задан.
  anthropicKey: req("ANTHROPIC_API_KEY"),
  model: process.env.MODEL ?? "claude-opus-4-8",

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

  siteUrl: process.env.SITE_URL ?? "https://www.bizreg.uz",
  workdir: process.env.WORKDIR ?? "./.workrepo",
  writerConcurrency: Number(process.env.WRITER_CONCURRENCY ?? 3),
  pollIntervalMs: Number(process.env.POLL_INTERVAL_MS ?? 10000),
  maxFixAttempts: Number(process.env.MAX_FIX_ATTEMPTS ?? 2),

  get repoUrl() {
    return `https://x-access-token:${this.githubToken}@github.com/${this.githubRepo}.git`;
  },
};

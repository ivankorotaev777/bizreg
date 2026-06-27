function req(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Не задана переменная окружения ${name}`);
  return v;
}

export const config = {
  databaseUrl: req("DATABASE_URL"),
  gscCredentials: req("GSC_CREDENTIALS"), // JSON сервисного аккаунта одной строкой
  gscSiteUrl: process.env.GSC_SITE_URL ?? "sc-domain:bizreg.uz",
  password: req("DASHBOARD_PASSWORD"),
  backfillDays: Number(process.env.GSC_BACKFILL_DAYS ?? 180),
  syncIntervalHours: Number(process.env.SYNC_INTERVAL_HOURS ?? 12),
  siteUrl: process.env.SITE_URL ?? "https://www.bizreg.uz",
  port: Number(process.env.PORT ?? 3000),
};

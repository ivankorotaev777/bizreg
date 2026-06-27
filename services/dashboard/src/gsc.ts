import { google } from "googleapis";
import { config } from "./config.js";
import { upsertRows, lastSyncDate, type GscRow } from "./db.js";

function client() {
  const credentials = JSON.parse(config.gscCredentials);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  return google.searchconsole({ version: "v1", auth });
}

const ymd = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Тянет статистику из Google Search Console и кладёт в Postgres.
 * Инкрементально: с последней даты в БД (данные «дозревают» ~2-3 дня),
 * при первом запуске — backfill за GSC_BACKFILL_DAYS.
 */
export async function syncGsc(): Promise<{ rows: number; from: string; to: string }> {
  const sc = client();

  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2); // в GSC данные доступны с задержкой ~2 дня
  const start = new Date(end);
  const last = await lastSyncDate();
  if (last) start.setTime(new Date(last + "T00:00:00Z").getTime());
  else start.setUTCDate(end.getUTCDate() - config.backfillDays);

  const startDate = ymd(start);
  const endDate = ymd(end);
  if (startDate > endDate) return { rows: 0, from: startDate, to: endDate };

  const ROW_LIMIT = 25000;
  const all: GscRow[] = [];
  let startRow = 0;
  for (;;) {
    const res = await sc.searchanalytics.query({
      siteUrl: config.gscSiteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date", "page", "query", "country"],
        rowLimit: ROW_LIMIT,
        startRow,
        dataState: "all",
      },
    });
    const rows = res.data.rows ?? [];
    for (const r of rows) {
      const [date, page, query, country] = (r.keys ?? []) as string[];
      if (!date) continue;
      all.push({
        date,
        page,
        query,
        country,
        clicks: Math.round(r.clicks ?? 0),
        impressions: Math.round(r.impressions ?? 0),
        position: r.position ?? 0,
      });
    }
    if (rows.length < ROW_LIMIT) break;
    startRow += ROW_LIMIT;
  }

  if (all.length) await upsertRows(all);
  return { rows: all.length, from: startDate, to: endDate };
}

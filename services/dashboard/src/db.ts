import pg from "pg";
import { config } from "./config.js";

const internal = /railway\.internal/.test(config.databaseUrl);
export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: internal ? undefined : { rejectUnauthorized: false },
});

/** Создаёт таблицы дашборда (идемпотентно) — отдельный ручной SQL не нужен. */
export async function ensureSchema(): Promise<void> {
  await pool.query(`
    create table if not exists gsc_daily (
      date         date not null,
      page         text not null,
      query        text not null,
      country      text not null,
      clicks       int  not null default 0,
      impressions  int  not null default 0,
      position     real not null default 0,
      primary key (date, page, query, country)
    );
    create index if not exists gsc_daily_page_idx  on gsc_daily (page, date);
    create index if not exists gsc_daily_query_idx on gsc_daily (query, date);
  `);
}

export interface GscRow {
  date: string;
  page: string;
  query: string;
  country: string;
  clicks: number;
  impressions: number;
  position: number;
}

/** Массовый upsert строк GSC (чанками). */
export async function upsertRows(rows: GscRow[]): Promise<void> {
  const CHUNK = 500;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const values: string[] = [];
    const params: unknown[] = [];
    chunk.forEach((r, j) => {
      const b = j * 7;
      values.push(`($${b + 1},$${b + 2},$${b + 3},$${b + 4},$${b + 5},$${b + 6},$${b + 7})`);
      params.push(r.date, r.page, r.query, r.country, r.clicks, r.impressions, r.position);
    });
    await pool.query(
      `insert into gsc_daily (date, page, query, country, clicks, impressions, position)
       values ${values.join(",")}
       on conflict (date, page, query, country) do update
         set clicks = excluded.clicks,
             impressions = excluded.impressions,
             position = excluded.position`,
      params,
    );
  }
}

export async function lastSyncDate(): Promise<string | null> {
  const { rows } = await pool.query("select max(date)::text as d from gsc_daily");
  return rows[0]?.d ?? null;
}

const since = (days: number) => `current_date - interval '${Math.max(1, days)} days'`;

/** Сводка за период: суммарные клики/показы + средняя позиция (взвеш. по показам) + дневной тренд. */
export async function overview(days: number) {
  const totals = await pool.query(
    `select coalesce(sum(clicks),0)::int as clicks,
            coalesce(sum(impressions),0)::int as impressions,
            coalesce(round((sum(position*impressions)/nullif(sum(impressions),0))::numeric,1),0) as position
     from gsc_daily where date >= ${since(days)}`,
  );
  const trend = await pool.query(
    `select date::text, sum(clicks)::int as clicks, sum(impressions)::int as impressions
     from gsc_daily where date >= ${since(days)}
     group by date order by date`,
  );
  return { totals: totals.rows[0], trend: trend.rows };
}

/** Агрегаты по страницам (статьям) за период. */
export async function pages(days: number) {
  const { rows } = await pool.query(
    `select page,
            sum(clicks)::int as clicks,
            sum(impressions)::int as impressions,
            round((sum(position*impressions)/nullif(sum(impressions),0))::numeric,1) as position,
            (array_agg(query order by clicks desc))[1] as top_query
     from gsc_daily where date >= ${since(days)}
     group by page
     order by clicks desc, impressions desc
     limit 200`,
  );
  return rows;
}

/** Детализация по одной странице: топ-запросы и разбивка по странам. */
export async function pageDetail(url: string, days: number) {
  const queries = await pool.query(
    `select query,
            sum(clicks)::int as clicks,
            sum(impressions)::int as impressions,
            round((sum(position*impressions)/nullif(sum(impressions),0))::numeric,1) as position
     from gsc_daily where page = $1 and date >= ${since(days)}
     group by query order by clicks desc, impressions desc limit 50`,
    [url],
  );
  const countries = await pool.query(
    `select country,
            sum(clicks)::int as clicks,
            sum(impressions)::int as impressions,
            round((sum(position*impressions)/nullif(sum(impressions),0))::numeric,1) as position
     from gsc_daily where page = $1 and date >= ${since(days)}
     group by country order by clicks desc, impressions desc limit 20`,
    [url],
  );
  return { queries: queries.rows, countries: countries.rows };
}

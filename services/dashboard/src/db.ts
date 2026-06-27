import pg from "pg";
import { config } from "./config.js";

const internal = /railway\.internal/.test(config.databaseUrl);
export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: internal ? undefined : { rejectUnauthorized: false },
});

/** Создаёт таблицы дашборда (идемпотентно). */
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
         set clicks = excluded.clicks, impressions = excluded.impressions, position = excluded.position`,
      params,
    );
  }
}

export async function lastSyncDate(): Promise<string | null> {
  const { rows } = await pool.query("select max(date)::text as d from gsc_daily");
  return rows[0]?.d ?? null;
}

const d = (n: number) => Math.max(1, Math.floor(n));
const CUR = (days: number) => `current_date - interval '${d(days)} days'`;
const PREV = (days: number) => `current_date - interval '${2 * d(days)} days'`;
const WPOS = "sum(position*impressions)/nullif(sum(impressions),0)"; // взвеш. позиция

/** KPI за период + те же показатели за предыдущий равный период (для дельт) + дневной тренд. */
export async function overview(days: number) {
  const cur = CUR(days);
  const totals = await pool.query(`
    select
      coalesce(sum(clicks)      filter (where date >= ${cur}),0)::int as clicks,
      coalesce(sum(impressions) filter (where date >= ${cur}),0)::int as impressions,
      coalesce(round((100.0*sum(clicks) filter (where date >= ${cur})
                      /nullif(sum(impressions) filter (where date >= ${cur}),0))::numeric,1),0) as ctr,
      coalesce(round((sum(position*impressions) filter (where date >= ${cur})
                      /nullif(sum(impressions) filter (where date >= ${cur}),0))::numeric,1),0) as position,
      coalesce(sum(clicks)      filter (where date < ${cur}),0)::int as prev_clicks,
      coalesce(sum(impressions) filter (where date < ${cur}),0)::int as prev_impressions,
      coalesce(round((100.0*sum(clicks) filter (where date < ${cur})
                      /nullif(sum(impressions) filter (where date < ${cur}),0))::numeric,1),0) as prev_ctr,
      coalesce(round((sum(position*impressions) filter (where date < ${cur})
                      /nullif(sum(impressions) filter (where date < ${cur}),0))::numeric,1),0) as prev_position
    from gsc_daily where date >= ${PREV(days)}
  `);
  const trend = await pool.query(
    `select date::text, sum(clicks)::int as clicks, sum(impressions)::int as impressions
     from gsc_daily where date >= ${cur} group by date order by date`,
  );
  return { totals: totals.rows[0], trend: trend.rows };
}

/** Распределение запросов по позициям (видимость). */
export async function buckets(days: number) {
  const { rows } = await pool.query(`
    select
      count(*) filter (where pos <= 3)              as top3,
      count(*) filter (where pos > 3 and pos <= 10) as p4_10,
      count(*) filter (where pos > 10 and pos <= 20) as p11_20,
      count(*) filter (where pos > 20 and pos <= 50) as p21_50,
      count(*) filter (where pos > 50)              as p50plus
    from (
      select query, ${WPOS} as pos
      from gsc_daily where date >= ${CUR(days)} group by query
    ) t where pos is not null
  `);
  return rows[0];
}

/** Главная таблица: запрос → позиция → клики/показы/CTR → статья. */
export async function queriesTable(days: number) {
  const { rows } = await pool.query(`
    select query,
      round((${WPOS})::numeric,1) as position,
      sum(clicks)::int as clicks,
      sum(impressions)::int as impressions,
      round((100.0*sum(clicks)/nullif(sum(impressions),0))::numeric,1) as ctr,
      (array_agg(page order by impressions desc))[1] as page
    from gsc_daily where date >= ${CUR(days)}
    group by query
    order by impressions desc, clicks desc
    limit 500
  `);
  return rows;
}

/** «Почти в топе» (striking distance): позиции ~5–20 с объёмом показов — куда легко дожать. */
export async function opportunities(days: number) {
  const { rows } = await pool.query(`
    select query,
      round((${WPOS})::numeric,1) as position,
      sum(impressions)::int as impressions,
      sum(clicks)::int as clicks,
      (array_agg(page order by impressions desc))[1] as page
    from gsc_daily where date >= ${CUR(days)}
    group by query
    having (${WPOS}) between 5 and 20 and sum(impressions) >= 5
    order by impressions desc
    limit 30
  `);
  return rows;
}

/** Топ-страницы (статьи). */
export async function pages(days: number) {
  const { rows } = await pool.query(`
    select page,
      sum(clicks)::int as clicks,
      sum(impressions)::int as impressions,
      round((${WPOS})::numeric,1) as position,
      (array_agg(query order by clicks desc, impressions desc))[1] as top_query
    from gsc_daily where date >= ${CUR(days)}
    group by page order by clicks desc, impressions desc limit 200
  `);
  return rows;
}

/** Детализация одной страницы: запросы + страны. */
export async function pageDetail(url: string, days: number) {
  const queries = await pool.query(
    `select query, sum(clicks)::int as clicks, sum(impressions)::int as impressions,
       round((${WPOS})::numeric,1) as position
     from gsc_daily where page = $1 and date >= ${CUR(days)}
     group by query order by impressions desc, clicks desc limit 50`,
    [url],
  );
  const countries = await pool.query(
    `select country, sum(clicks)::int as clicks, sum(impressions)::int as impressions,
       round((${WPOS})::numeric,1) as position
     from gsc_daily where page = $1 and date >= ${CUR(days)}
     group by country order by impressions desc, clicks desc limit 20`,
    [url],
  );
  return { queries: queries.rows, countries: countries.rows };
}

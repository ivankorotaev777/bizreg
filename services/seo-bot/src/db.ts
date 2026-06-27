import pg from "pg";
import { config } from "./config.js";

// Внутри Railway (приватная сеть, хост *.railway.internal) SSL не нужен;
// при подключении по публичному URL включаем мягкий SSL.
const internal = /railway\.internal/.test(config.databaseUrl);
export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: internal ? undefined : { rejectUnauthorized: false },
});

export interface Manager {
  telegram_id: number;
  name: string;
  role: "owner" | "manager";
}

export interface ArticleRow {
  slug: string;
  title_ru: string;
  date_published: string | null;
  date_modified: string | null;
  last_update: string | null;
  update_count: number;
}

export interface UpdateRow {
  manager_name: string | null;
  summary: string | null;
  created_at: string;
}

/** Проверка аллоулиста: вернёт менеджера или null. */
export async function getManager(telegramId: number): Promise<Manager | null> {
  const { rows } = await pool.query(
    "select telegram_id, name, role from managers where telegram_id = $1",
    [telegramId],
  );
  return (rows[0] as Manager) ?? null;
}

/** Список статей с датой последнего обновления (для пикера). */
export async function listArticles(): Promise<ArticleRow[]> {
  const { rows } = await pool.query("select * from articles_with_updates");
  return rows as ArticleRow[];
}

export async function getArticle(slug: string): Promise<ArticleRow | null> {
  const { rows } = await pool.query(
    "select * from articles_with_updates where slug = $1",
    [slug],
  );
  return (rows[0] as ArticleRow) ?? null;
}

/** Полная история обновлений статьи (новые сверху). */
export async function getHistory(slug: string): Promise<UpdateRow[]> {
  const { rows } = await pool.query(
    "select manager_name, summary, created_at from article_updates where slug = $1 order by created_at desc",
    [slug],
  );
  return rows as UpdateRow[];
}

/** Поставить задание на дополнение статьи. */
export async function enqueueEnrichment(opts: {
  slug: string;
  note: string;
  managerId: number;
  managerName: string;
}): Promise<void> {
  await pool.query(
    "insert into jobs (type, payload, created_by) values ('enrichment', $1::jsonb, $2)",
    [
      JSON.stringify({
        slug: opts.slug,
        note: opts.note,
        manager_id: opts.managerId,
        manager_name: opts.managerName,
      }),
      opts.managerId,
    ],
  );
}

/** Поставить задание на генерацию N новых статей (только владелец). */
export async function enqueueGeneration(opts: {
  count: number;
  topics?: string[];
  managerId: number;
  managerName: string;
}): Promise<void> {
  await pool.query(
    "insert into jobs (type, payload, created_by) values ('generation', $1::jsonb, $2)",
    [
      JSON.stringify({
        count: opts.count,
        topics: opts.topics ?? [],
        manager_id: opts.managerId,
        manager_name: opts.managerName,
      }),
      opts.managerId,
    ],
  );
}

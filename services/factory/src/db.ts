import pg from "pg";
import { config } from "./config.js";

const internal = /railway\.internal/.test(config.databaseUrl);
export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: internal ? undefined : { rejectUnauthorized: false },
});

export interface Job {
  id: string;
  type: "enrichment" | "generation";
  status: string;
  payload: any; // pg сам парсит jsonb в объект
  attempts: number;
  created_by: number | null;
}

/**
 * Атомарно забирает следующее задание из очереди (или null).
 * Транзакция + FOR UPDATE SKIP LOCKED — безопасно при нескольких воркерах.
 */
export async function claimNextJob(): Promise<Job | null> {
  const client = await pool.connect();
  try {
    await client.query("begin");
    const sel = await client.query(
      "select id from jobs where status = 'queued' order by created_at for update skip locked limit 1",
    );
    if (sel.rowCount === 0) {
      await client.query("commit");
      return null;
    }
    const id = sel.rows[0].id;
    const upd = await client.query(
      "update jobs set status = 'processing', started_at = now(), attempts = attempts + 1 where id = $1 returning id, type, status, payload, attempts, created_by",
      [id],
    );
    await client.query("commit");
    return upd.rows[0] as Job;
  } catch (e) {
    await client.query("rollback");
    throw e;
  } finally {
    client.release();
  }
}

export async function markDone(id: string, result: unknown): Promise<void> {
  await pool.query(
    "update jobs set status = 'done', result = $2::jsonb, finished_at = now() where id = $1",
    [id, JSON.stringify(result)],
  );
}

export async function markError(id: string, err: string): Promise<void> {
  await pool.query(
    "update jobs set status = 'error', error = $2, finished_at = now() where id = $1",
    [id, err.slice(0, 4000)],
  );
}

export async function recordUpdate(opts: {
  slug: string;
  managerId: number | null;
  managerName: string | null;
  summary: string;
  note: string;
  commitSha: string;
}): Promise<void> {
  await pool.query(
    "insert into article_updates (slug, manager_id, manager_name, summary, note, commit_sha) values ($1, $2, $3, $4, $5, $6)",
    [
      opts.slug,
      opts.managerId,
      opts.managerName,
      opts.summary.slice(0, 500),
      opts.note.slice(0, 4000),
      opts.commitSha,
    ],
  );
}

export interface ArticleMeta {
  slug: string;
  title_ru: string;
  date_published: string | null;
  date_modified: string | null;
}

/** Обновляет кэш списка статей (для пикера в боте). */
export async function upsertArticles(rows: ArticleMeta[]): Promise<void> {
  if (rows.length === 0) return;
  const client = await pool.connect();
  try {
    await client.query("begin");
    for (const r of rows) {
      await client.query(
        `insert into articles (slug, title_ru, date_published, date_modified, synced_at)
         values ($1, $2, $3, $4, now())
         on conflict (slug) do update
           set title_ru = excluded.title_ru,
               date_published = excluded.date_published,
               date_modified = excluded.date_modified,
               synced_at = now()`,
        [r.slug, r.title_ru, r.date_published, r.date_modified],
      );
    }
    await client.query("commit");
  } catch (e) {
    await client.query("rollback");
    throw e;
  } finally {
    client.release();
  }
}

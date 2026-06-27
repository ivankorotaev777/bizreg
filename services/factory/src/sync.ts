import { listArticleMeta } from "./repo.js";
import { upsertArticles } from "./db.js";

/** Синхронизирует кэш списка статей (таблица articles) из репозитория. */
export async function syncArticles(): Promise<number> {
  const meta = await listArticleMeta();
  await upsertArticles(
    meta.map((m) => ({
      slug: m.slug,
      title_ru: m.title,
      date_published: m.datePublished,
      date_modified: m.dateModified,
    })),
  );
  return meta.length;
}

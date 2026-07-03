import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/seo/pages";
import { localizedUrl, hreflang } from "@/lib/seo/site";
import { getAllPostParams, getPostLocales, getPost } from "@/lib/blog";

function emit(
  entries: MetadataRoute.Sitemap,
  path: string,
  locales: readonly string[],
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
  lastModified?: string,
) {
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[hreflang(loc)] = localizedUrl(loc, path);
  if (locales.includes("ru")) languages["x-default"] = localizedUrl("ru", path);
  for (const loc of locales) {
    entries.push({
      url: localizedUrl(loc, path),
      changeFrequency,
      priority,
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages },
    });
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of indexableRoutes) {
    emit(entries, route.path, route.locales, route.priority ?? 0.6, route.changeFrequency ?? "weekly");
  }

  // Блог: индекс + статьи (динамически). Индекс — ru+en (zh-листинг тонкий).
  emit(entries, "/blog", ["ru", "en"], 0.6);
  const slugs = [...new Set(getAllPostParams().map((p) => p.slug))];
  for (const slug of slugs) {
    const locs = getPostLocales(slug);
    const post = getPost(slug, locs[0]);
    const lastmod = post?.dateModified ?? post?.factsCheckedOn ?? post?.datePublished;
    emit(entries, `/blog/${slug}`, locs, 0.7, "monthly", lastmod);
  }

  return entries;
}

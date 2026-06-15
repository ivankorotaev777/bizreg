import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/seo/pages";
import { localizedUrl, hreflang } from "@/lib/seo/site";
import { getAllPostParams, getPostLocales } from "@/lib/blog";

function emit(
  entries: MetadataRoute.Sitemap,
  path: string,
  locales: readonly string[],
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
) {
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[hreflang(loc)] = localizedUrl(loc, path);
  if (locales.includes("ru")) languages["x-default"] = localizedUrl("ru", path);
  for (const loc of locales) {
    entries.push({ url: localizedUrl(loc, path), changeFrequency, priority, alternates: { languages } });
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of indexableRoutes) {
    emit(entries, route.path, route.locales, route.priority ?? 0.6, route.changeFrequency ?? "weekly");
  }

  // Блог: индекс + статьи (динамически)
  emit(entries, "/blog", ["ru", "en", "zh"], 0.6);
  const slugs = [...new Set(getAllPostParams().map((p) => p.slug))];
  for (const slug of slugs) {
    emit(entries, `/blog/${slug}`, getPostLocales(slug), 0.7);
  }

  return entries;
}

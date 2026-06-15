import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/seo/pages";
import { localizedUrl, hreflang } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of indexableRoutes) {
    const languages: Record<string, string> = {};
    for (const loc of route.locales) {
      languages[hreflang(loc)] = localizedUrl(loc, route.path);
    }
    if (route.locales.includes("ru")) {
      languages["x-default"] = localizedUrl("ru", route.path);
    }

    for (const loc of route.locales) {
      entries.push({
        url: localizedUrl(loc, route.path),
        changeFrequency: route.changeFrequency ?? "weekly",
        priority: route.priority ?? 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}

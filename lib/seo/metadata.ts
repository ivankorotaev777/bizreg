import type { Metadata } from "next";
import { SITE, localizedUrl, hreflang } from "./site";

/** Метаданные страницы: canonical + hreflang + OpenGraph. Для новых SEO-страниц. */
export function pageMetadata(opts: {
  locale: string;
  path: string; // ru-путь (для ru — в корне)
  localesAvailable: readonly string[]; // в каких локалях существует страница
  title: string;
  description: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of opts.localesAvailable) {
    languages[hreflang(l)] = localizedUrl(l, opts.path);
  }
  if (opts.localesAvailable.includes("ru")) {
    languages["x-default"] = localizedUrl("ru", opts.path);
  }

  const url = localizedUrl(opts.locale, opts.path);

  return {
    metadataBase: new URL(SITE.url),
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: opts.type ?? "website",
      siteName: SITE.name,
      locale: opts.locale === "ru" ? "ru_RU" : opts.locale === "zh" ? "zh_CN" : "en_US",
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
    robots: opts.noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

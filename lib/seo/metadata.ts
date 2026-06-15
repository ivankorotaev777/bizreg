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
  image?: string; // путь (/blog/...) или абсолютный URL
  noindex?: boolean;
}): Metadata {
  const ogImage = opts.image
    ? opts.image.startsWith("http")
      ? opts.image
      : SITE.url + opts.image
    : `${SITE.url}/blog/uzbekistan-hero.jpg`;
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
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [ogImage] },
    robots: opts.noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

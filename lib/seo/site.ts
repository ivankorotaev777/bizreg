// Базовая SEO-конфигурация сайта bizreg.uz

export const SITE = {
  // Канонический хост — с www (apex редиректит на www через 307).
  url: "https://www.bizreg.uz",
  name: "BizReg",
  legalName: 'ООО "Ustores"',
  phone: "+998903478692",
  telegram: "https://t.me/bizreg_uz",
  email: "",
  address: {
    locality: "Ташкент",
    region: "Шайхантахурский район",
    street: "массив Джангох, 37",
    countryCode: "UZ",
  },
  hours: "Mo-Fr 09:00-18:00",
  sameAs: [] as string[],
} as const;

// Локали, которые таргетим в SEO (под них генерим новые страницы)
export const SEO_LOCALES = ["ru", "en", "zh"] as const;
// Все локали сайта (для существующих страниц)
export const ALL_LOCALES = ["ru", "en", "kk", "uz", "zh"] as const;

export type SeoLocale = (typeof SEO_LOCALES)[number];

/** Полный URL страницы для локали с учётом localePrefix: "as-needed" (ru — без префикса). */
export function localizedUrl(locale: string, path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  if (locale === "ru") return SITE.url + (clean || "/");
  return SITE.url + "/" + locale + clean;
}

/** hreflang-код для локали. */
export function hreflang(locale: string): string {
  return locale; // ru/en/zh/kk/uz — валидные ISO-639-1
}

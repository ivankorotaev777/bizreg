import { getRequestConfig } from "next-intl/server";

export const locales = ["ru", "en", "kk", "uz", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  kk: "Қазақша",
  uz: "O'zbek",
  zh: "中文",
};

export const defaultLocale: Locale = "ru";

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request (set by middleware or setRequestLocale)
  let locale = await requestLocale;

  // Validate and fall back to default if invalid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

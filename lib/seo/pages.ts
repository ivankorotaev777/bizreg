// Реестр страниц для sitemap + hreflang.
// Добавляй сюда новые money/hub страницы по мере создания.
//
// Индексируем маркетинговые страницы только в ru+en: контент реально есть на
// русском и английском; kk/uz/zh-версии — тонкие дубли (перевод только UI, без
// уникального контента), из-за них GSC показывал «Duplicate/Not indexed». Блог
// эмитится по фактическим локалям статьи (getPostLocales), см. app/sitemap.ts.
const RU_EN = ["ru", "en"] as const;

export type ChangeFreq =
  | "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface RouteDef {
  path: string;          // ru-путь (для ru — в корне), напр. "/registraciya-ooo-v-uzbekistane"
  locales: readonly string[]; // в каких локалях существует
  priority?: number;
  changeFrequency?: ChangeFreq;
  type?: "page" | "money" | "hub";
  noindex?: boolean;     // не включать в sitemap
}

export const routes: RouteDef[] = [
  // существующие
  { path: "/", locales: RU_EN, priority: 1, changeFrequency: "weekly" },
  { path: "/about", locales: RU_EN, priority: 0.5 },
  { path: "/contacts", locales: RU_EN, priority: 0.5 },
  { path: "/guarantees", locales: RU_EN, priority: 0.4 },
  { path: "/payment", locales: RU_EN, priority: 0.4 },
  { path: "/clients", locales: RU_EN, priority: 0.4 },
  { path: "/price_list_full", locales: RU_EN, priority: 0.6 },
  { path: "/itpark", locales: ["ru"], priority: 0.8, type: "money" },
  { path: "/thank_you", locales: RU_EN, noindex: true },

  { path: "/kalkulyator-buhgalterii", locales: RU_EN, priority: 0.7, type: "money" },

  // НОВЫЕ money/hub страницы добавляются ниже по мере сборки:
  // { path: "/registraciya-ooo-v-uzbekistane", locales: ["ru"], priority: 0.9, type: "money" },
];

export const indexableRoutes = routes.filter((r) => !r.noindex);

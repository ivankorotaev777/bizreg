// Реестр страниц для sitemap + hreflang.
// Добавляй сюда новые money/hub страницы по мере создания.
import { ALL_LOCALES } from "./site";

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
  { path: "/", locales: ALL_LOCALES, priority: 1, changeFrequency: "weekly" },
  { path: "/about", locales: ALL_LOCALES, priority: 0.5 },
  { path: "/contacts", locales: ALL_LOCALES, priority: 0.5 },
  { path: "/guarantees", locales: ALL_LOCALES, priority: 0.4 },
  { path: "/payment", locales: ALL_LOCALES, priority: 0.4 },
  { path: "/clients", locales: ALL_LOCALES, priority: 0.4 },
  { path: "/price_list_full", locales: ALL_LOCALES, priority: 0.6 },
  { path: "/itpark", locales: ["ru"], priority: 0.8, type: "money" },
  { path: "/thank_you", locales: ALL_LOCALES, noindex: true },

  // НОВЫЕ money/hub страницы добавляются ниже по мере сборки:
  // { path: "/registraciya-ooo-v-uzbekistane", locales: ["ru"], priority: 0.9, type: "money" },
];

export const indexableRoutes = routes.filter((r) => !r.noindex);

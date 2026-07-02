// Теги статей блога — производные от frontmatter `cluster` (C1, C7, …).
// Кластеры в контенте разнородные (C1, C1xГЕО, C4ITPark…) — берём базовый код CN.

const MAP: Record<string, { ru: string; en: string }> = {
  C1: { ru: "Регистрация", en: "Registration" },
  C3: { ru: "Иностранное предприятие", en: "Foreign enterprise" },
  C4: { ru: "IT Park", en: "IT Park" },
  C5: { ru: "Юр. адрес", en: "Legal address" },
  C6: { ru: "Бухгалтерия", en: "Accounting" },
  C7: { ru: "Налоги", en: "Taxes" },
  C8: { ru: "Разрешение на работу", en: "Work permit" },
  C9: { ru: "Банковский счёт", en: "Bank account" },
  C10: { ru: "Лицензии", en: "Licensing" },
  C11: { ru: "Персонал", en: "HR & staff" },
  C12: { ru: "ВНЖ и релокация", en: "Residence & relocation" },
  C13: { ru: "Платежи и ВЭД", en: "Payments & FX" },
};

export interface ArticleTag {
  code: string; // C1, C7, …
  label: string; // локализованная метка
}

/** Тег статьи из строки cluster; null, если кластер не распознан. */
export function clusterTag(cluster: string | undefined, locale: string): ArticleTag | null {
  if (!cluster) return null;
  const m = cluster.match(/C\d+/i);
  if (!m) return null;
  const code = m[0].toUpperCase();
  const t = MAP[code];
  if (!t) return null;
  return { code, label: locale === "ru" ? t.ru : t.en };
}

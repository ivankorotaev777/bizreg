// Уникальный визуал для статьи про IT Park для SaaS-команд:
// «горизонт льгот» — временная шкала ключевых дат льготного режима резидента
// (базовые льготы до 2028, экспортные льготы и дивиденды/таможня до 2040),
// чтобы SaaS-фаундер сразу видел, на какой срок и при каком условии работает
// каждая преференция. Цвета — из акцентной палитры темы (--a-*).

const RU = {
  badge: "Горизонт льгот резидента IT Park",
  subtitle: "До какой даты и при каком условии действует каждая преференция",
  rows: [
    {
      year: "2026",
      title: "Новые правила с 1 апреля",
      note: "Дифференцированные отчисления в дирекцию по уровню дохода и экспорту; льготы не применяются к платёжным организациям, маркетплейсам и МФО (ПП-388).",
      tone: "base",
    },
    {
      year: "2028",
      title: "Базовые льготы для всех резидентов",
      note: "Освобождение от налога на прибыль, НДС, соцналога и налога с оборота действует до 1 января 2028 года; НДФЛ сотрудников 7,5%.",
      tone: "accent",
    },
    {
      year: "2030",
      title: "Зарубежные поставщики IT-услуг",
      note: "Освобождение от налога на прибыль в 2025–2030 для иностранных поставщиков услуг резидентам с экспортом свыше $10 млн в год (УП-157).",
      tone: "base",
    },
    {
      year: "2040",
      title: "Экспортно ориентированные команды",
      note: "Компании с долей экспорта свыше 50% сохраняют льготы вплоть до 2040 года; дивиденды иностранным акционерам — не более 5%; таможенные пошлины на оборудование обнулены.",
      tone: "accent",
    },
  ],
  caption: "Даты и условия — по данным it-park.uz и lex.uz (ПП-388, УП-157). Сверяйте на 2026-06-15.",
};

const EN = {
  badge: "IT Park resident benefit horizon",
  subtitle: "Until which date and under what condition each preference applies",
  rows: [
    {
      year: "2026",
      title: "New rules from 1 April",
      note: "Differentiated contributions to the directorate based on income and export; benefits no longer apply to payment organisations, marketplaces and microfinance (Resolution PP-388).",
      tone: "base",
    },
    {
      year: "2028",
      title: "Baseline benefits for all residents",
      note: "Exemption from profit tax, VAT, social and turnover tax runs until 1 January 2028; employee income tax is 7.5%.",
      tone: "accent",
    },
    {
      year: "2030",
      title: "Foreign IT service providers",
      note: "Profit-tax exemption in 2025–2030 for foreign providers serving residents whose export exceeds $10M per year (Decree UP-157).",
      tone: "base",
    },
    {
      year: "2040",
      title: "Export-oriented teams",
      note: "Companies with over 50% of revenue from abroad keep benefits through to 2040; dividends to foreign shareholders capped at 5%; customs duties on equipment zeroed.",
      tone: "accent",
    },
  ],
  caption: "Dates and conditions per it-park.uz and lex.uz (PP-388, UP-157). Verify as of 2026-06-15.",
};

export function BenefitHorizon({ lang = "ru" }: { lang?: "ru" | "en" }) {
  const t = lang === "en" ? EN : RU;
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-[var(--a-50)] px-5 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--a-700)]">
          {t.badge}
        </p>
        <p className="mt-0.5 text-sm text-slate-500">{t.subtitle}</p>
      </div>

      <ol className="relative px-5 py-6">
        <span
          className="absolute bottom-6 left-[2.35rem] top-6 w-px bg-[var(--a-200)]"
          aria-hidden
        />
        {t.rows.map((r) => {
          const accent = r.tone === "accent";
          return (
            <li key={r.year} className="relative flex gap-4 pb-6 last:pb-0">
              <div className="relative z-10 flex flex-col items-center">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold ${
                    accent
                      ? "bg-[var(--a-500)] text-white"
                      : "border border-[var(--a-300)] bg-white text-[var(--a-700)]"
                  }`}
                >
                  {r.year}
                </span>
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <p className="font-semibold text-slate-900">{r.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{r.note}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <figcaption className="border-t border-slate-100 px-5 py-3 text-center text-sm text-slate-500">
        {t.caption}
      </figcaption>
    </figure>
  );
}

// Уникальный визуал для статьи про СИДН Узбекистана:
// «матрица ставок по соглашениям» — сравнивает внутреннюю (домашнюю) ставку
// налога у источника со ставками по СИДН для основных стран-партнёров
// (дивиденды / проценты / роялти). Помогает читателю сразу увидеть, на сколько
// конкретное соглашение снижает удержание. Цвета — из акцентной палитры (--a-*).
// Источник данных вынесен в caption; цифры — диапазоны из текстов соглашений
// (зависят от доли участия и условий) по PwC Tax Summaries и НК РУз.

const RU = {
  badge: "Ставки налога у источника: внутренняя vs по СИДН",
  subtitle: "Дивиденды · проценты · роялти для основных стран-партнёров",
  head: { country: "Страна", div: "Дивиденды", int: "Проценты", roy: "Роялти" },
  rows: [
    { country: "Без СИДН (внутренняя)", div: "10%", int: "10%", roy: "20%", base: true },
    { country: "Россия", div: "10%", int: "0–10%", roy: "0%" },
    { country: "Казахстан", div: "10%", int: "0–10%", roy: "10%" },
    { country: "Германия", div: "5–15%", int: "0–5%", roy: "3–5%" },
    { country: "Великобритания", div: "5–10%", int: "5%", roy: "5%" },
    { country: "Швейцария", div: "5–15%", int: "0–5%", roy: "5%" },
    { country: "Китай", div: "10%", int: "0–10%", roy: "10%" },
  ],
  caption:
    "Диапазоны зависят от доли участия в капитале и условий конкретного соглашения. Источник: PwC Tax Summaries и НК РУз (ст. 353, 357). Сверяйте на 2026-06-28.",
};

const EN = {
  badge: "Withholding rates: domestic vs treaty (DTT)",
  subtitle: "Dividends · interest · royalties for major partner countries",
  head: { country: "Country", div: "Dividends", int: "Interest", roy: "Royalties" },
  rows: [
    { country: "No DTT (domestic)", div: "10%", int: "10%", roy: "20%", base: true },
    { country: "Russia", div: "10%", int: "0–10%", roy: "0%" },
    { country: "Kazakhstan", div: "10%", int: "0–10%", roy: "10%" },
    { country: "Germany", div: "5–15%", int: "0–5%", roy: "3–5%" },
    { country: "United Kingdom", div: "5–10%", int: "5%", roy: "5%" },
    { country: "Switzerland", div: "5–15%", int: "0–5%", roy: "5%" },
    { country: "China", div: "10%", int: "0–10%", roy: "10%" },
  ],
  caption:
    "Ranges depend on the ownership share and conditions of the specific treaty. Source: PwC Tax Summaries and Tax Code of Uzbekistan (arts. 353, 357). Verify as of 2026-06-28.",
};

export function TreatyRateMatrix({ lang = "ru" }: { lang?: "ru" | "en" }) {
  const t = lang === "en" ? EN : RU;
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-[var(--a-50)] px-5 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--a-700)]">
          {t.badge}
        </p>
        <p className="mt-0.5 text-sm text-slate-500">{t.subtitle}</p>
      </div>

      <div className="hidden gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid sm:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <span>{t.head.country}</span>
        <span className="text-right">{t.head.div}</span>
        <span className="text-right">{t.head.int}</span>
        <span className="text-right">{t.head.roy}</span>
      </div>

      <div className="divide-y divide-slate-100">
        {t.rows.map((r) => (
          <div
            key={r.country}
            className={`grid grid-cols-2 gap-x-4 gap-y-1 px-5 py-3 sm:grid-cols-[1.6fr_1fr_1fr_1fr] ${
              r.base ? "bg-slate-50" : ""
            }`}
          >
            <p
              className={`col-span-2 font-semibold sm:col-span-1 ${
                r.base ? "text-slate-500" : "text-slate-900"
              }`}
            >
              {r.country}
            </p>
            <Cell label={t.head.div} value={r.div} base={r.base} />
            <Cell label={t.head.int} value={r.int} base={r.base} />
            <Cell label={t.head.roy} value={r.roy} base={r.base} />
          </div>
        ))}
      </div>

      <figcaption className="border-t border-slate-100 px-5 py-3 text-center text-sm text-slate-500">
        {t.caption}
      </figcaption>
    </figure>
  );
}

function Cell({ label, value, base }: { label: string; value: string; base?: boolean }) {
  return (
    <p className="flex items-center justify-between sm:justify-end">
      <span className="text-xs text-slate-400 sm:hidden">{label}</span>
      <span
        className={`rounded-full px-2.5 py-0.5 text-sm font-bold ${
          base
            ? "bg-slate-200 text-slate-600"
            : "bg-[var(--a-100)] text-[var(--a-700)]"
        }`}
      >
        {value}
      </span>
    </p>
  );
}

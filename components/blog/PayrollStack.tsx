// Уникальный визуал для статьи про НДФЛ и зарплатные налоги:
// «из чего складывается налог с зарплаты» — наглядный разбор начисленной
// зарплаты на удержания работника и нагрузку работодателя сверх ФОТ.
// Пример: оклад 10 000 000 сум. Цвета — из акцентной палитры темы (--a-*).

const RU = {
  badge: "Из чего складывается зарплата",
  subtitle: "Пример: оклад 10 000 000 сум в месяц",
  grossLabel: "Начислено (gross)",
  employeeTitle: "Удерживается из зарплаты работника",
  employerTitle: "Платит работодатель сверх оклада",
  rows: [
    { name: "НДФЛ", note: "удерживается из начисленной зарплаты", rate: "12%", amount: "1 200 000 сум", side: "employee" },
    { name: "из них на ИНПС", note: "0,1% направляется на накопительный счёт из суммы НДФЛ", rate: "0,1%", amount: "10 000 сум", side: "employee", sub: true },
    { name: "На руки (net)", note: "остаётся работнику после НДФЛ", rate: "—", amount: "8 800 000 сум", side: "net" },
    { name: "Социальный налог", note: "начисляется сверху на фонд оплаты труда", rate: "12%", amount: "1 200 000 сум", side: "employer" },
  ],
  totalLabel: "Общая стоимость найма для работодателя",
  total: "11 200 000 сум",
  caption: "Ставки на 2026 г.; ИНПС 0,1% входит в сумму НДФЛ и не увеличивает нагрузку. Сверяйте с soliq.uz и lex.uz.",
};

const EN = {
  badge: "What a salary is made of",
  subtitle: "Example: a 10,000,000 sum monthly salary",
  grossLabel: "Gross pay",
  employeeTitle: "Withheld from the employee's pay",
  employerTitle: "Paid by the employer on top of salary",
  rows: [
    { name: "Personal income tax", note: "withheld from gross salary", rate: "12%", amount: "1,200,000 sum", side: "employee" },
    { name: "of which to INPS", note: "0.1% goes to the savings account out of the PIT amount", rate: "0.1%", amount: "10,000 sum", side: "employee", sub: true },
    { name: "Take-home (net)", note: "what the employee keeps after PIT", rate: "—", amount: "8,800,000 sum", side: "net" },
    { name: "Social tax", note: "charged on top of the payroll fund", rate: "12%", amount: "1,200,000 sum", side: "employer" },
  ],
  totalLabel: "Total cost of hire for the employer",
  total: "11,200,000 sum",
  caption: "Rates for 2026; the 0.1% INPS is part of the PIT and does not add to the burden. Verify on soliq.uz and lex.uz.",
};

export function PayrollStack({ lang = "ru" }: { lang?: "ru" | "en" }) {
  const t = lang === "en" ? EN : RU;
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-[var(--a-50)] px-5 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--a-700)]">
          {t.badge}
        </p>
        <p className="mt-0.5 text-sm text-slate-500">{t.subtitle}</p>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between rounded-xl border border-[var(--a-200)] bg-[var(--a-50)] px-4 py-3">
          <span className="font-semibold text-slate-900">{t.grossLabel}</span>
          <span className="font-mono font-bold text-[var(--a-700)]">10 000 000</span>
        </div>
      </div>

      <ol className="divide-y divide-slate-100 border-t border-slate-100">
        {t.rows.map((r) => {
          const tone =
            r.side === "net"
              ? { dot: "#10b981", chip: "bg-emerald-50 text-emerald-700" }
              : r.side === "employer"
                ? { dot: "#f59e0b", chip: "bg-amber-50 text-amber-700" }
                : { dot: "var(--a-500)", chip: "bg-[var(--a-100)] text-[var(--a-700)]" };
          return (
            <li
              key={r.name}
              className={`flex items-center gap-4 px-5 py-4 ${r.sub ? "pl-10" : ""}`}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: tone.dot, opacity: r.sub ? 0.5 : 1 }}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{r.name}</p>
                <p className="text-sm text-slate-500">{r.note}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${tone.chip}`}>
                {r.rate}
              </span>
              <span className="w-32 shrink-0 text-right font-mono text-sm font-semibold text-slate-900">
                {r.amount}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-4">
        <span className="font-semibold text-slate-900">{t.totalLabel}</span>
        <span className="font-mono text-base font-bold text-[var(--a-700)]">{t.total}</span>
      </div>

      <figcaption className="border-t border-slate-100 px-5 py-3 text-center text-sm text-slate-500">
        {t.caption}
      </figcaption>
    </figure>
  );
}

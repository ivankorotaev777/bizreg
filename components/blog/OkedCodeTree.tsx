// Уникальный визуал для статьи про ОКЭД: разбор структуры пятизначного кода
// от раздела к подклассу. Цвета — из акцентной палитры темы (--a-*).
const LEVELS = [
  { mask: "ХХ", name: "Раздел", note: "укрупнённая сфера экономики", filled: 2 },
  { mask: "ХХ.Х", name: "Группа", note: "направление внутри раздела", filled: 3 },
  { mask: "ХХ.ХХ", name: "Класс", note: "конкретный вид деятельности", filled: 4 },
  { mask: "ХХ.ХХ.Х", name: "Подкласс", note: "максимально точная формулировка", filled: 5 },
];

export function OkedCodeTree() {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-[var(--a-50)] px-5 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--a-700)]">
          Структура кода ОКЭД
        </p>
        <p className="mt-0.5 text-sm text-slate-500">
          От общего к частному — чем больше знаков, тем точнее вид деятельности
        </p>
      </div>

      <ol className="divide-y divide-slate-100">
        {LEVELS.map((lvl, i) => (
          <li key={lvl.name} className="flex items-center gap-4 px-5 py-4">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: "var(--a-500)", opacity: 0.55 + i * 0.15 }}
            >
              {i + 1}
            </div>

            {/* визуализация знаков кода */}
            <div className="flex shrink-0 items-center gap-1" aria-hidden>
              {[0, 1, 2, 3, 4].map((d) => (
                <span
                  key={d}
                  className="flex h-7 w-6 items-center justify-center rounded-md text-xs font-semibold"
                  style={
                    d < lvl.filled
                      ? { background: "var(--a-100)", color: "var(--a-700)", border: "1px solid var(--a-200)" }
                      : { background: "#f1f5f9", color: "#cbd5e1", border: "1px solid #e2e8f0" }
                  }
                >
                  {d < lvl.filled ? "Х" : "·"}
                </span>
              ))}
            </div>

            <div className="min-w-0">
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-sm font-semibold text-[var(--a-700)]">{lvl.mask}</span>
                <span className="font-semibold text-slate-900">{lvl.name}</span>
              </p>
              <p className="text-sm text-slate-500">{lvl.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="border-t border-slate-100 px-5 py-3 text-center text-sm text-slate-500">
        Пример уровня детализации; точные коды сверяйте в действующей редакции ОКЭД на stat.uz
      </figcaption>
    </figure>
  );
}

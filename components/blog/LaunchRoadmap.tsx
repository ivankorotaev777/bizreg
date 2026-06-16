// Уникальный визуал «зонтичной» статьи: сквозной роадмап запуска IT-компании
// в Узбекистане — от идеи до старта. Этапы сгруппированы по фазам, каждый
// этап ссылается на профильную статью кластера. Цвета — из палитры темы (--a-*).
import { Link } from "@/i18n/navigation";

type Stage = {
  no: string;
  title: string;
  note: string;
  href?: string;
  linkLabel?: string;
};

const PHASES_RU: { phase: string; tag: string; stages: Stage[] }[] = [
  {
    phase: "Подготовка",
    tag: "идея → структура",
    stages: [
      { no: "01", title: "Идея и проверка деятельности", note: "Сверяете профиль с перечнем IT Park: разработка ПО, IT-услуги, экспорт цифровых услуг." },
      { no: "02", title: "Выбор формы бизнеса", note: "Иностранцу — ООО или иностранное предприятие; ИП недоступен.", href: "/blog/kak-otkryt-ooo-poshagovo", linkLabel: "как открыть ООО" },
      { no: "03", title: "Подбор кодов ОКЭД", note: "Коды должны совпадать с профилем IT Park и реальным проектом.", href: "/blog/oked-vidy-deyatelnosti", linkLabel: "виды деятельности" },
    ],
  },
  {
    phase: "Регистрация",
    tag: "юрлицо → счёт",
    stages: [
      { no: "04", title: "Госрегистрация компании", note: "Название, устав, юр.адрес, подача через my.gov.uz, ИНН и реестр." },
      { no: "05", title: "Банковский счёт", note: "Чаще всего — личный визит и комплаенс; самый долгий этап.", href: "/blog/otkryt-schet-v-banke-uzbekistana", linkLabel: "открыть счёт" },
    ],
  },
  {
    phase: "Резидентство",
    tag: "статус → старт",
    stages: [
      { no: "06", title: "Заявка в IT Park", note: "Подаёте документы и описание проекта на резидентство.", href: "/blog/kak-stat-rezidentom-it-park", linkLabel: "как стать резидентом" },
      { no: "07", title: "Льготы и старт", note: "Получаете статус, применяете льготы и запускаете операции.", href: "/blog/it-park-lgoty", linkLabel: "льготы IT Park" },
    ],
  },
];

const PHASES_EN: { phase: string; tag: string; stages: Stage[] }[] = [
  {
    phase: "Preparation",
    tag: "idea → structure",
    stages: [
      { no: "01", title: "Idea & activity check", note: "Match your profile to the IT Park list: software development, IT services, export of digital services." },
      { no: "02", title: "Choose a legal form", note: "A foreigner uses an LLC or a foreign enterprise; sole proprietorship is not available.", href: "/blog/kak-otkryt-ooo-poshagovo", linkLabel: "how to open an LLC" },
      { no: "03", title: "Pick OKED codes", note: "Codes must match the IT Park profile and your real project.", href: "/blog/oked-vidy-deyatelnosti", linkLabel: "activity codes" },
    ],
  },
  {
    phase: "Registration",
    tag: "entity → account",
    stages: [
      { no: "04", title: "State registration", note: "Name, charter, legal address, filing via my.gov.uz, tax ID and registry." },
      { no: "05", title: "Bank account", note: "Usually an in-person visit and compliance; the longest step.", href: "/blog/otkryt-schet-v-banke-uzbekistana", linkLabel: "open an account" },
    ],
  },
  {
    phase: "Residency",
    tag: "status → launch",
    stages: [
      { no: "06", title: "IT Park application", note: "Submit documents and a project description for residency.", href: "/blog/kak-stat-rezidentom-it-park", linkLabel: "becoming a resident" },
      { no: "07", title: "Benefits & launch", note: "Get the status, apply the benefits and start operating.", href: "/blog/it-park-lgoty", linkLabel: "IT Park benefits" },
    ],
  },
];

export function LaunchRoadmap({ lang = "ru" }: { lang?: string }) {
  const en = lang === "en";
  const phases = en ? PHASES_EN : PHASES_RU;
  const heading = en
    ? "Roadmap: from idea to launching an IT company"
    : "Роадмап: от идеи до запуска IT-компании";
  const sub = en
    ? "Seven stages in three phases — every entity-related step links to a detailed guide"
    : "Семь этапов в трёх фазах — каждый шаг ведёт к подробному разбору";

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-br from-[var(--a-500)] to-[var(--a-700)] px-5 py-4 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide">{heading}</p>
        <p className="mt-0.5 text-sm text-white/85">{sub}</p>
      </div>

      <div className="divide-y divide-slate-100">
        {phases.map((p) => (
          <div key={p.phase} className="grid gap-4 px-5 py-5 sm:grid-cols-[0.7fr_2.3fr]">
            <div className="sm:pt-1">
              <p className="text-base font-bold text-slate-900">{p.phase}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-[var(--a-600)]">{p.tag}</p>
            </div>

            <ol className="space-y-3">
              {p.stages.map((s) => (
                <li key={s.no} className="flex gap-3 rounded-xl border border-slate-200 bg-[var(--a-50)]/40 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--a-500)] font-mono text-sm font-bold text-white">
                    {s.no}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug text-slate-900">{s.title}</p>
                    <p className="mt-0.5 text-sm leading-6 text-slate-600">{s.note}</p>
                    {s.href && (
                      <Link
                        href={s.href}
                        className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[var(--a-700)] underline underline-offset-2 hover:text-[var(--a-600)]"
                      >
                        {en ? "Read" : "Подробнее"}: {s.linkLabel} {"→"}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </figure>
  );
}

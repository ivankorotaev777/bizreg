// Уникальный визуал для статьи про виды деятельности IT Park:
// структурированный каталог категорий разрешённой деятельности (по группам)
// + компактная таблица «попадает / не попадает». Двуязычно через проп lang.
import {
  Code2, Database, GraduationCap, Globe2, ShieldCheck, Cpu,
  Rocket, Check, X,
} from "lucide-react";

type Group = {
  Icon: typeof Code2;
  title: { ru: string; en: string };
  items: { ru: string; en: string }[];
};

const GROUPS: Group[] = [
  {
    Icon: Code2,
    title: { ru: "Разработка ПО", en: "Software development" },
    items: [
      { ru: "Проектирование, разработка и реализация ПО для любых платформ, включая компьютерные игры", en: "Design, development and sale of software for any platform, including computer games" },
      { ru: "Внедрение, поддержка, сопровождение и доработка ПО", en: "Implementation, support, maintenance and modification of software" },
      { ru: "Разработка и внедрение автоматизированных систем управления", en: "Development and rollout of automated management systems" },
    ],
  },
  {
    Icon: Database,
    title: { ru: "Данные и дата-центры", en: "Data & data centers" },
    items: [
      { ru: "Обработка данных с применением ПО, создание и сопровождение баз данных", en: "Data processing via software, building and maintaining databases" },
      { ru: "Аренда инфраструктуры хранения и обработки данных (co-location) и ЦОД", en: "Renting storage/processing infrastructure (co-location) and data-center capacity" },
      { ru: "Автоматизированные услуги поиска, отбора и сортировки данных", en: "Automated search, selection and sorting of data services" },
    ],
  },
  {
    Icon: Globe2,
    title: { ru: "Экспорт IT-услуг и аутсорсинг", en: "IT-service export & outsourcing" },
    items: [
      { ru: "Экспорт информационных услуг через интернет", en: "Export of information services over the internet" },
      { ru: "Аутсорсинг бизнес-процессов (BPO) для нерезидентов", en: "Business-process outsourcing (BPO) for non-residents" },
      { ru: "Экспорт услуг аутсорсинга знаний (KPO)", en: "Export of knowledge-process outsourcing (KPO)" },
    ],
  },
  {
    Icon: GraduationCap,
    title: { ru: "Образование в IT", en: "IT education" },
    items: [
      { ru: "Обучение в сфере информационных технологий (в т.ч. онлайн)", en: "Training in information technology (including online)" },
      { ru: "Обучение английскому — не более 40% годового дохода от IT-обучения", en: "English training — capped at 40% of annual IT-training revenue" },
      { ru: "Обучение по направлению BPO в рамках экспорта IT-услуг", en: "BPO-track training within IT-service export" },
    ],
  },
  {
    Icon: ShieldCheck,
    title: { ru: "Безопасность и мультимедиа", en: "Security & multimedia" },
    items: [
      { ru: "Техническая и криптографическая защита информации, ЭЦП", en: "Technical and cryptographic data protection, e-signature" },
      { ru: "Мультимедиа и дизайн (UX/UI, графика, 3D, моушн)", en: "Multimedia and design (UX/UI, graphics, 3D, motion)" },
      { ru: "Анимация и киберспорт", en: "Animation and esports" },
    ],
  },
  {
    Icon: Cpu,
    title: { ru: "Hardware, R&D и космос", en: "Hardware, R&D & aerospace" },
    items: [
      { ru: "Микро-, опто- и наноэлектроника, IoT, радиотехнологии", en: "Micro-, opto- and nanoelectronics, IoT, radio technologies" },
      { ru: "Научно-исследовательская и опытно-конструкторская деятельность (R&D)", en: "Research and development (R&D)" },
      { ru: "Аэрокосмические технологии", en: "Aerospace technologies" },
    ],
  },
  {
    Icon: Rocket,
    title: { ru: "Венчур и стартапы", en: "Venture & startups" },
    items: [
      { ru: "Венчурное финансирование IT-проектов и акселерация", en: "Venture funding of IT projects and acceleration" },
      { ru: "Стартап-проекты программы «Цифровые стартапы»", en: "Startups in the Digital Startups programme" },
      { ru: "IT-медиа, отвечающие отдельным количественным критериям", en: "IT media meeting specific quantitative criteria" },
    ],
  },
];

export function ActivityCatalog({ lang = "ru" }: { lang?: "ru" | "en" }) {
  const en = lang === "en";
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {GROUPS.map((g) => {
        const Icon = g.Icon;
        return (
          <div key={g.title.ru} className="rounded-2xl border border-[var(--a-200)] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--a-50)] text-[var(--a-600)]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="font-semibold text-slate-900">{en ? g.title.en : g.title.ru}</p>
            </div>
            <ul className="space-y-2">
              {g.items.map((it) => (
                <li key={it.ru} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--a-500)]" />
                  <span>{en ? it.en : it.ru}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* Таблица «попадает / не попадает» — зелёный да / красный нет */
export function EligibilityTable({ children, lang = "ru" }: { children?: React.ReactNode; lang?: "ru" | "en" }) {
  const en = lang === "en";
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="hidden gap-4 bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)] sm:grid sm:grid-cols-[1.2fr_0.7fr_1.7fr]">
        <span>{en ? "Activity / product" : "Деятельность / продукт"}</span>
        <span>{en ? "In the list?" : "В перечне?"}</span>
        <span>{en ? "Why" : "Почему"}</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}

export function EligibilityRow({
  item, fits, note, lang = "ru",
}: { item: string; fits: boolean; note: string; lang?: "ru" | "en" }) {
  const en = lang === "en";
  const yes = en ? "Yes" : "Да";
  const no = en ? "No" : "Нет";
  return (
    <div className="grid gap-2 px-5 py-4 sm:grid-cols-[1.2fr_0.7fr_1.7fr] sm:gap-4 sm:items-start">
      <p className="font-semibold text-slate-900">{item}</p>
      <p>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${fits ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
          {fits ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
          {fits ? yes : no}
        </span>
      </p>
      <p className="text-sm leading-6 text-slate-600">{note}</p>
    </div>
  );
}

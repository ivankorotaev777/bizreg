// Визуальные блоки для статей блога (используются прямо в MDX).
// Акцентные цвета берутся из CSS-переменных --a-* (тема статьи, см. accents.ts).
import type { ReactNode } from "react";
import Image from "next/image";
import {
  Info, Lightbulb, AlertTriangle, CheckCircle2, XCircle, ArrowRight,
  Building2, FileText, Landmark, Wallet, ShieldCheck, Rocket, Globe, Scale, Send,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const ICONS = {
  building: Building2, doc: FileText, bank: Landmark, wallet: Wallet,
  shield: ShieldCheck, rocket: Rocket, globe: Globe, scale: Scale,
} as const;

/* Вводный абзац — крупный лид */
export function Lead({ children }: { children?: ReactNode }) {
  return <p className="mb-8 text-xl leading-8 text-slate-700">{children}</p>;
}

/* Callout: info | tip | warning | note (tip = акцент темы) */
export function Callout({
  type = "info", title, children,
}: { type?: "info" | "tip" | "warning" | "note"; title?: string; children?: ReactNode }) {
  const map = {
    info: { Icon: Info, cls: "border-blue-200 bg-blue-50", ic: "text-blue-600" },
    tip: { Icon: Lightbulb, cls: "border-[var(--a-200)] bg-[var(--a-50)]", ic: "text-[var(--a-600)]" },
    warning: { Icon: AlertTriangle, cls: "border-amber-200 bg-amber-50", ic: "text-amber-600" },
    note: { Icon: Info, cls: "border-slate-200 bg-slate-50", ic: "text-slate-500" },
  } as const;
  const c = map[type] ?? map.info;
  const Icon = c.Icon;
  return (
    <div className={`my-6 flex gap-3 rounded-xl border ${c.cls} p-4 sm:p-5`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${c.ic}`} />
      <div className="text-slate-700">
        {title && <p className="mb-1 font-semibold text-slate-900">{title}</p>}
        <div className="space-y-2 leading-7">{children}</div>
      </div>
    </div>
  );
}

/* Сетка статистики */
export function StatGrid({ children }: { children?: ReactNode }) {
  return <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">{children}</div>;
}
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
      <div className="text-3xl font-bold text-[var(--a-600)]">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}

/* Нумерованные шаги (инфографика процесса) */
export function Steps({ children }: { children?: ReactNode }) {
  return <ol className="my-8 space-y-4">{children}</ol>;
}
export function Step({ n, title, children }: { n: number; title: string; children?: ReactNode }) {
  return (
    <li className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--a-500)] text-lg font-bold text-white">
        {n}
      </div>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <div className="mt-1 leading-7 text-slate-600">{children}</div>
      </div>
    </li>
  );
}

/* Карточки-сравнение */
export function CompareGrid({ children }: { children?: ReactNode }) {
  return <div className="my-8 grid gap-4 sm:grid-cols-2">{children}</div>;
}
export function CompareCard({
  title, badge, children, highlight,
}: { title: string; badge?: string; children?: ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-6 ${highlight ? "border-[var(--a-300)] bg-[var(--a-50)] ring-1 ring-[var(--a-200)]" : "border-slate-200 bg-white"}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {badge && <span className="rounded-full bg-[var(--a-100)] px-2.5 py-0.5 text-xs font-medium text-[var(--a-700)]">{badge}</span>}
      </div>
      <div className="mt-3 space-y-2 text-slate-600">{children}</div>
    </div>
  );
}

/* Ключевые выводы (children = markdown-список) */
export function KeyTakeaways({ title = "Главное", children }: { title?: string; children?: ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-[var(--a-200)] bg-[var(--a-50)] p-6">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--a-700)]">
        <CheckCircle2 className="h-4 w-4" /> {title}
      </p>
      <div className="text-slate-700 [&_li]:marker:text-[var(--a-500)]">{children}</div>
    </div>
  );
}

/* Плюсы / минусы — обёртка + карточки */
export function ProsCons({ children }: { children?: ReactNode }) {
  return <div className="my-8 grid gap-4 sm:grid-cols-2">{children}</div>;
}
export function Pros({ title = "Плюсы", children }: { title?: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
      <p className="mb-2 flex items-center gap-2 font-semibold text-emerald-800"><CheckCircle2 className="h-5 w-5 text-emerald-600" /> {title}</p>
      <div className="text-slate-700 [&_li]:marker:text-emerald-500">{children}</div>
    </div>
  );
}
export function Cons({ title = "Минусы", children }: { title?: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
      <p className="mb-2 flex items-center gap-2 font-semibold text-rose-800"><XCircle className="h-5 w-5 text-rose-500" /> {title}</p>
      <div className="text-slate-700 [&_li]:marker:text-rose-400">{children}</div>
    </div>
  );
}

/* Изображение с подписью */
export function Figure({ src, alt, caption, width = 1200, height = 675 }: {
  src: string; alt: string; caption?: string; width?: number; height?: number;
}) {
  return (
    <figure className="my-8">
      <Image src={src} alt={alt} width={width} height={height}
        className="w-full rounded-2xl border border-slate-200 object-cover" />
      {caption && <figcaption className="mt-2 text-center text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

/* Inline-CTA — кнопка-ссылка для вставки прямо по тексту */
export function InlineCta({ href, children }: { href: string; children?: ReactNode }) {
  return (
    <span className="my-5 flex justify-center">
      <Link href={href} className="inline-flex items-center gap-2 rounded-lg bg-[var(--a-500)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--a-600)]">
        <Send className="h-4 w-4" /> {children} <ArrowRight className="h-4 w-4" />
      </Link>
    </span>
  );
}

/* Иконочные карточки «что получаете» */
export function IconGrid({ children }: { children?: ReactNode }) {
  return <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
export function Feature({
  icon, title, children,
}: { icon?: keyof typeof ICONS; title: string; children?: ReactNode }) {
  const Icon = (icon && ICONS[icon]) || Rocket;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[var(--a-200)] hover:shadow-md">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--a-50)] text-[var(--a-600)]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{children}</p>
    </div>
  );
}

/* CTA-блок */
export function CtaBox({ href, title, label }: { href: string; title: string; label: string }) {
  return (
    <div className="my-10 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-[var(--a-500)] to-[var(--a-700)] p-8 text-center text-white">
      <p className="text-xl font-semibold">{title}</p>
      <Link href={href} className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[var(--a-700)] transition hover:bg-[var(--a-50)]">
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* Уникальный визуал: таблица ставок налога у источника по типам дохода */
export function RateTable({ children }: { children?: ReactNode }) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="flex items-center justify-between bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)]">
        <span>Вид дохода / Income</span>
        <span>Ставка у источника / WHT</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}
export function RateRow({
  income, rate, note, highlight,
}: { income: string; rate: string; note?: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 px-5 py-4 ${highlight ? "bg-[var(--a-50)]/60" : ""}`}>
      <div className="min-w-0">
        <p className="font-semibold text-slate-900">{income}</p>
        {note && <p className="mt-0.5 text-sm text-slate-500">{note}</p>}
      </div>
      <span className={`shrink-0 rounded-full px-3.5 py-1.5 text-base font-bold ${highlight ? "bg-[var(--a-500)] text-white" : "bg-[var(--a-100)] text-[var(--a-700)]"}`}>
        {rate}
      </span>
    </div>
  );
}

/* Уникальный визуал: таблица «что входит» по тарифам/пакетам.
   TierTable содержит TierCol (колонка-пакет), внутри — TierItem (строка с галкой/прочерком). */
export function TierTable({ children }: { children?: ReactNode }) {
  return <div className="my-8 grid gap-4 sm:grid-cols-3">{children}</div>;
}
export function TierCol({
  name, tagline, children, highlight,
}: { name: string; tagline?: string; children?: ReactNode; highlight?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-2xl border ${highlight ? "border-[var(--a-300)] ring-1 ring-[var(--a-200)]" : "border-slate-200"} bg-white shadow-sm`}>
      <div className={`px-5 py-4 ${highlight ? "bg-gradient-to-br from-[var(--a-500)] to-[var(--a-700)] text-white" : "bg-[var(--a-50)] text-slate-900"}`}>
        <p className="text-lg font-bold">{name}</p>
        {tagline && <p className={`mt-0.5 text-xs ${highlight ? "text-white/80" : "text-slate-500"}`}>{tagline}</p>}
      </div>
      <ul className="divide-y divide-slate-100">{children}</ul>
    </div>
  );
}
export function TierItem({ ok, children }: { ok?: boolean; children?: ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 px-5 py-3 text-sm">
      {ok
        ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--a-600)]" />
        : <XCircle className="h-4 w-4 shrink-0 text-slate-300" />}
      <span className={ok ? "text-slate-700" : "text-slate-400 line-through"}>{children}</span>
    </li>
  );
}

/* Уникальный визуал: матрица изменений «что меняем → документы → срок → пошлина» */
export function ChangeMatrix({ children }: { children?: ReactNode }) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="hidden gap-4 bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)] sm:grid sm:grid-cols-[1.1fr_1.6fr_1fr_1fr]">
        <span>Что меняем</span>
        <span>Документы</span>
        <span>Срок</span>
        <span>Госпошлина</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}
export function ChangeRow({
  what, docs, deadline, fee, highlight,
}: { what: string; docs: string; deadline: string; fee: string; highlight?: boolean }) {
  return (
    <div className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.1fr_1.6fr_1fr_1fr] sm:gap-4 sm:items-start ${highlight ? "bg-[var(--a-50)]/60" : ""}`}>
      <p className="font-semibold text-slate-900">{what}</p>
      <p className="text-sm text-slate-600"><span className="font-medium text-slate-500 sm:hidden">Документы: </span>{docs}</p>
      <p className="text-sm text-slate-600"><span className="font-medium text-slate-500 sm:hidden">Срок: </span>{deadline}</p>
      <p className="text-sm font-medium text-[var(--a-700)]"><span className="font-medium text-slate-500 sm:hidden">Пошлина: </span>{fee}</p>
    </div>
  );
}

/* Уникальный визуал: чек-лист учредительных документов (документ → кто готовит → нюанс) */
export function DocChecklist({ children }: { children?: ReactNode }) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="grid grid-cols-[1.1fr_0.9fr_1.3fr] gap-3 bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)]">
        <span>Документ / Document</span>
        <span>Кто готовит / Prepared by</span>
        <span>Нюанс / Note</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}
export function DocRow({
  doc, who, note, highlight,
}: { doc: string; who: string; note: string; highlight?: boolean }) {
  return (
    <div className={`grid grid-cols-[1.1fr_0.9fr_1.3fr] items-start gap-3 px-5 py-4 ${highlight ? "bg-[var(--a-50)]/60" : ""}`}>
      <div className="flex items-start gap-2 font-semibold text-slate-900">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--a-500)]" />
        <span>{doc}</span>
      </div>
      <div className="text-sm leading-6 text-slate-600">{who}</div>
      <div className="text-sm leading-6 text-slate-600">{note}</div>
    </div>
  );
}

/* Уникальный визуал: таблица «что важно при въезде» (пункт → статус → пояснение) */
export function EntryTable({ children, lang = "ru" }: { children?: ReactNode; lang?: string }) {
  const en = lang === "en";
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="hidden gap-4 bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)] sm:grid sm:grid-cols-[1.1fr_0.9fr_1.6fr]">
        <span>{en ? "What matters" : "Что важно"}</span>
        <span>{en ? "Status" : "Статус"}</span>
        <span>{en ? "Details" : "Пояснение"}</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}
export function EntryRow({
  item, status, note, highlight,
}: { item: string; status: string; note: string; highlight?: boolean }) {
  return (
    <div className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.1fr_0.9fr_1.6fr] sm:gap-4 sm:items-start ${highlight ? "bg-[var(--a-50)]/60" : ""}`}>
      <p className="font-semibold text-slate-900">{item}</p>
      <p>
        <span className="inline-flex rounded-full bg-[var(--a-100)] px-2.5 py-0.5 text-xs font-semibold text-[var(--a-700)]">{status}</span>
      </p>
      <p className="text-sm leading-6 text-slate-600">{note}</p>
    </div>
  );
}

/* Уникальный визуал: схема движения международного платежа (4 шага) */
export function PaymentFlow({ lang = "ru" }: { lang?: string }) {
  const en = lang === "en";
  const steps = en
    ? [
        { t: "Client / sender", d: "Invoice issued in foreign currency" },
        { t: "SWIFT transfer", d: "Routed via a correspondent bank" },
        { t: "Bank in Uzbekistan", d: "Currency control, then crediting" },
        { t: "Your FX account", d: "Hold · convert · pay out" },
      ]
    : [
        { t: "Клиент / отправитель", d: "Выставляете инвойс в валюте" },
        { t: "SWIFT-перевод", d: "Идёт через банк-корреспондент" },
        { t: "Банк в Узбекистане", d: "Валютный контроль и зачисление" },
        { t: "Ваш валютный счёт", d: "Держать · конвертировать · платить" },
      ];
  return (
    <div className="my-8 rounded-2xl border border-[var(--a-200)] bg-[var(--a-50)]/40 p-5">
      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map((s, i) => (
          <div key={i} className="relative rounded-xl border border-[var(--a-200)] bg-white p-4">
            <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--a-600)] text-sm font-bold text-white">{i + 1}</div>
            <p className="font-semibold leading-snug text-slate-900">{s.t}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Уникальный визуал: таблица типов валютных операций (операция → направление → основание → комментарий) */
export function OpsTable({ children, lang = "ru" }: { children?: ReactNode; lang?: string }) {
  const en = lang === "en";
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="hidden gap-4 bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)] sm:grid sm:grid-cols-[1.4fr_0.8fr_1.2fr_1.6fr]">
        <span>{en ? "Operation" : "Операция"}</span>
        <span>{en ? "Direction" : "Направление"}</span>
        <span>{en ? "Basis" : "Основание"}</span>
        <span>{en ? "Note" : "Комментарий"}</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}
export function OpsRow({
  op, dir, basis, note, highlight,
}: { op: string; dir: string; basis: string; note: string; highlight?: boolean }) {
  return (
    <div className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.4fr_0.8fr_1.2fr_1.6fr] sm:gap-4 sm:items-start ${highlight ? "bg-[var(--a-50)]/60" : ""}`}>
      <p className="font-semibold text-slate-900">{op}</p>
      <p>
        <span className="inline-flex rounded-full bg-[var(--a-100)] px-2.5 py-0.5 text-xs font-semibold text-[var(--a-700)]">{dir}</span>
      </p>
      <p className="text-sm leading-6 text-slate-600">{basis}</p>
      <p className="text-sm leading-6 text-slate-600">{note}</p>
    </div>
  );
}

/* Уникальный визуал: сравнительная матрица по странам СНГ (страна → въезд → пребывание → СИДН → специфика) */
export function CountryMatrix({ children, lang = "ru" }: { children?: ReactNode; lang?: string }) {
  const en = lang === "en";
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="hidden gap-4 bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)] lg:grid lg:grid-cols-[0.9fr_0.8fr_0.9fr_0.9fr_1.8fr]">
        <span>{en ? "Country" : "Страна"}</span>
        <span>{en ? "Entry" : "Въезд"}</span>
        <span>{en ? "Stay" : "Пребывание"}</span>
        <span>{en ? "DTT" : "СИДН"}</span>
        <span>{en ? "Specifics" : "Специфика"}</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}
export function CountryRow({
  country, entry, stay, dtt, note, highlight,
}: { country: string; entry: string; stay: string; dtt: string; note: string; highlight?: boolean }) {
  return (
    <div className={`grid gap-2 px-5 py-4 lg:grid-cols-[0.9fr_0.8fr_0.9fr_0.9fr_1.8fr] lg:gap-4 lg:items-start ${highlight ? "bg-[var(--a-50)]/60" : ""}`}>
      <p className="font-semibold text-slate-900">{country}</p>
      <p>
        <span className="inline-flex rounded-full bg-[var(--a-100)] px-2.5 py-0.5 text-xs font-semibold text-[var(--a-700)]">{entry}</span>
      </p>
      <p className="text-sm leading-6 text-slate-600">{stay}</p>
      <p className="text-sm leading-6 text-slate-600">{dtt}</p>
      <p className="text-sm leading-6 text-slate-600">{note}</p>
    </div>
  );
}

/* Уникальный визуал: трёхколоночное сравнение «коворкинг vs отдельный офис vs юр.адрес-услуга».
   SpaceCompare содержит заголовок-шапку и строки SpaceRow (критерий → коворкинг → офис → услуга). */
export function SpaceCompare({ children, lang = "ru" }: { children?: ReactNode; lang?: string }) {
  const en = lang === "en";
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="hidden gap-4 bg-gradient-to-r from-[var(--a-500)] to-[var(--a-700)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white sm:grid sm:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <span>{en ? "Criterion" : "Критерий"}</span>
        <span>{en ? "Coworking" : "Коворкинг"}</span>
        <span>{en ? "Private office" : "Отдельный офис"}</span>
        <span>{en ? "Address service" : "Юр.адрес-услуга"}</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}
export function SpaceRow({
  criterion, cowork, office, service, highlight,
}: { criterion: string; cowork: string; office: string; service: string; highlight?: boolean }) {
  return (
    <div className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.2fr_1fr_1fr_1fr] sm:gap-4 sm:items-start ${highlight ? "bg-[var(--a-50)]/60" : ""}`}>
      <p className="font-semibold text-slate-900">{criterion}</p>
      <p className="text-sm leading-6 text-slate-600"><span className="font-medium text-slate-500 sm:hidden">Коворкинг: </span>{cowork}</p>
      <p className="text-sm leading-6 text-slate-600"><span className="font-medium text-slate-500 sm:hidden">Офис: </span>{office}</p>
      <p className="text-sm leading-6 text-slate-600"><span className="font-medium text-slate-500 sm:hidden">Услуга: </span>{service}</p>
    </div>
  );
}

/* Уникальный визуал: две колонки сигналов «массовый» адрес vs надёжный адрес.
   SignalGrid содержит SignalCol (kind: bad|good), внутри — SignalItem. */
export function SignalGrid({ children }: { children?: ReactNode }) {
  return <div className="my-8 grid gap-4 sm:grid-cols-2">{children}</div>;
}
export function SignalCol({
  title, kind = "good", children,
}: { title: string; kind?: "bad" | "good"; children?: ReactNode }) {
  const bad = kind === "bad";
  return (
    <div className={bad
      ? "rounded-2xl border border-rose-200 bg-rose-50/40 p-5"
      : "rounded-2xl border border-[var(--a-300)] bg-[var(--a-50)] p-5 ring-1 ring-[var(--a-200)]"}>
      <p className={`mb-3 flex items-center gap-2 font-semibold ${bad ? "text-rose-800" : "text-[var(--a-800)]"}`}>
        {bad ? <AlertTriangle className="h-5 w-5 text-rose-500" /> : <ShieldCheck className="h-5 w-5 text-[var(--a-600)]" />}
        {title}
      </p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}
export function SignalItem({ kind = "good", children }: { kind?: "bad" | "good"; children?: ReactNode }) {
  const bad = kind === "bad";
  return (
    <li className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
      {bad
        ? <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
        : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--a-600)]" />}
      <span>{children}</span>
    </li>
  );
}

/* Уникальный визуал: таблица рисков «массового» адреса (риск → на что влияет → последствие) */
export function RiskTable({ children, lang = "ru" }: { children?: ReactNode; lang?: string }) {
  const en = lang === "en";
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="hidden gap-4 bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)] sm:grid sm:grid-cols-[1.1fr_1fr_1.6fr]">
        <span>{en ? "Risk" : "Риск"}</span>
        <span>{en ? "Where it hits" : "На что влияет"}</span>
        <span>{en ? "Consequence" : "Последствие"}</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}
export function RiskRow({
  risk, area, result, highlight,
}: { risk: string; area: string; result: string; highlight?: boolean }) {
  return (
    <div className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.1fr_1fr_1.6fr] sm:gap-4 sm:items-start ${highlight ? "bg-[var(--a-50)]/60" : ""}`}>
      <p className="flex items-start gap-2 font-semibold text-slate-900">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <span>{risk}</span>
      </p>
      <p className="text-sm leading-6 text-slate-600"><span className="font-medium text-slate-500 sm:hidden">→ </span>{area}</p>
      <p className="text-sm leading-6 text-slate-600">{result}</p>
    </div>
  );
}

/* Уникальный визуал: сравнение требований к адресу — для регистрации vs для НДС */
export function AddressMatrix({ lang = "ru" }: { lang?: string }) {
  const en = lang === "en";
  const head = en
    ? { crit: "Requirement", reg: "For registration", vat: "For VAT" }
    : { crit: "Требование к адресу", reg: "Для регистрации ООО", vat: "Для учёта по НДС" };
  const rows = en
    ? [
        { c: "Address is mandatory", r: "Yes — a required detail", v: "Yes — re-checked on VAT registration", hi: false },
        { c: "Proof of right to use", r: "Letter of guarantee / lease", v: "Same, but verified more closely", hi: false },
        { c: "Real premises", r: "Expected", v: "Critical — tied to invoices", hi: true },
        { c: "Mass address tolerance", r: "Often passes unnoticed", v: "High risk for deductions", hi: true },
        { c: "Registry vs reality match", r: "Should match", v: "Must match — affects invoices", hi: false },
        { c: "Depth of tax review", r: "Light", v: "In-depth", hi: true },
      ]
    : [
        { c: "Адрес обязателен", r: "Да — обязательный реквизит", v: "Да — перепроверка при учёте по НДС", hi: false },
        { c: "Подтверждение права", r: "Гарантийное письмо / аренда", v: "То же, но проверяют пристальнее", hi: false },
        { c: "Реальность помещения", r: "Ожидается", v: "Критично — связано со счёт-фактурами", hi: true },
        { c: "Терпимость к массовости", r: "Часто проходит незаметно", v: "Высокий риск по вычетам", hi: true },
        { c: "Стыковка реестра и факта", r: "Желательна", v: "Обязательна — влияет на вычеты", hi: false },
        { c: "Глубина проверки налоговой", r: "Мягкая", v: "Углублённая", hi: true },
      ];
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--a-200)] bg-white shadow-sm">
      <div className="hidden gap-4 bg-[var(--a-50)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--a-700)] sm:grid sm:grid-cols-[1.2fr_1.2fr_1.4fr]">
        <span>{head.crit}</span>
        <span>{head.reg}</span>
        <span>{head.vat}</span>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.2fr_1.2fr_1.4fr] sm:gap-4 sm:items-start ${row.hi ? "bg-[var(--a-50)]/60" : ""}`}
          >
            <p className="font-semibold text-slate-900">{row.c}</p>
            <p className="text-sm leading-6 text-slate-600">
              <span className="font-medium text-slate-500 sm:hidden">{head.reg}: </span>{row.r}
            </p>
            <p className="text-sm leading-6 text-slate-700">
              <span className="font-medium text-slate-500 sm:hidden">{head.vat}: </span>
              <span className={row.hi ? "font-medium text-[var(--a-700)]" : ""}>{row.v}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* FAQ-элемент (без JS, на <details>) */
export function Faq({ q, children }: { q: string; children?: ReactNode }) {
  return (
    <details className="group my-3 overflow-hidden rounded-xl border border-slate-200">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-medium text-slate-900 hover:bg-slate-50">
        {q}
        <span className="text-xl leading-none text-[var(--a-500)] transition group-open:rotate-45">+</span>
      </summary>
      <div className="px-4 pb-4 leading-7 text-slate-600">{children}</div>
    </details>
  );
}

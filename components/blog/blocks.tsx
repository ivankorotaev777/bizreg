// Визуальные блоки для статей блога (используются прямо в MDX).
import type { ReactNode } from "react";
import Image from "next/image";
import {
  Info, Lightbulb, AlertTriangle, CheckCircle2, XCircle, ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

/* Вводный абзац — крупный лид */
export function Lead({ children }: { children?: ReactNode }) {
  return <p className="mb-8 text-xl leading-8 text-slate-700">{children}</p>;
}

/* Callout: info | tip | warning | note */
const CALLOUT = {
  info: { icon: Info, ring: "border-blue-200", bg: "bg-blue-50", ic: "text-blue-600" },
  tip: { icon: Lightbulb, ring: "border-brand-200", bg: "bg-brand-50", ic: "text-brand-600" },
  warning: { icon: AlertTriangle, ring: "border-amber-200", bg: "bg-amber-50", ic: "text-amber-600" },
  note: { icon: Info, ring: "border-slate-200", bg: "bg-slate-50", ic: "text-slate-500" },
} as const;

export function Callout({
  type = "info", title, children,
}: { type?: keyof typeof CALLOUT; title?: string; children?: ReactNode }) {
  const c = CALLOUT[type] ?? CALLOUT.info;
  const Icon = c.icon;
  return (
    <div className={`my-6 flex gap-3 rounded-xl border ${c.ring} ${c.bg} p-4 sm:p-5`}>
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
      <div className="text-3xl font-bold text-brand-600">{value}</div>
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white">
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
    <div className={`rounded-2xl border p-6 ${highlight ? "border-brand-300 bg-brand-50/40 ring-1 ring-brand-200" : "border-slate-200 bg-white"}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {badge && <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">{badge}</span>}
      </div>
      <div className="mt-3 space-y-2 text-slate-600">{children}</div>
    </div>
  );
}

/* Ключевые выводы (children = markdown-список) */
export function KeyTakeaways({ title = "Главное", children }: { title?: string; children?: ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-brand-200 bg-brand-50/50 p-6">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-700">
        <CheckCircle2 className="h-4 w-4" /> {title}
      </p>
      <div className="text-slate-700 [&_li]:marker:text-brand-500">{children}</div>
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

/* Inline CTA */
export function CtaBox({ href, title, label }: { href: string; title: string; label: string }) {
  return (
    <div className="my-10 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-center text-white">
      <p className="text-xl font-semibold">{title}</p>
      <Link href={href} className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50">
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* FAQ-элемент (без JS, на <details>); используется по одному в MDX */
export function Faq({ q, children }: { q: string; children?: ReactNode }) {
  return (
    <details className="group my-3 overflow-hidden rounded-xl border border-slate-200">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-medium text-slate-900 hover:bg-slate-50">
        {q}
        <span className="text-xl leading-none text-brand-500 transition group-open:rotate-45">+</span>
      </summary>
      <div className="px-4 pb-4 leading-7 text-slate-600">{children}</div>
    </details>
  );
}

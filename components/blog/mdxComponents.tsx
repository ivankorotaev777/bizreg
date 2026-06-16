// Стилизация MDX-элементов под типографику сайта (без @tailwindcss/typography).
import type { ReactNode } from "react";
import {
  Lead, Callout, StatGrid, Stat, Steps, Step, CompareGrid, CompareCard,
  KeyTakeaways, ProsCons, Pros, Cons, Figure, CtaBox, Faq, InlineCta,
  IconGrid, Feature, RateTable, RateRow,
} from "./blocks";
import { HeroArt } from "./HeroArt";
import { OkedCodeTree } from "./OkedCodeTree";

export const mdxComponents = {
  // визуальные блоки, доступные в MDX
  Lead, Callout, StatGrid, Stat, Steps, Step, CompareGrid, CompareCard,
  KeyTakeaways, ProsCons, Pros, Cons, Figure, CtaBox, Faq, InlineCta,
  IconGrid, Feature, HeroArt, OkedCodeTree, RateTable, RateRow,

  h2: (p: { children?: ReactNode }) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold text-slate-900 scroll-mt-24" {...p} />
  ),
  h3: (p: { children?: ReactNode }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-slate-800" {...p} />
  ),
  p: (p: { children?: ReactNode }) => (
    <p className="my-4 leading-7 text-slate-700" {...p} />
  ),
  ul: (p: { children?: ReactNode }) => (
    <ul className="my-4 ml-5 list-disc space-y-2 text-slate-700" {...p} />
  ),
  ol: (p: { children?: ReactNode }) => (
    <ol className="my-4 ml-5 list-decimal space-y-2 text-slate-700" {...p} />
  ),
  li: (p: { children?: ReactNode }) => <li className="leading-7" {...p} />,
  a: (p: { children?: ReactNode; href?: string }) => (
    <a
      className="font-medium text-[var(--a-600)] underline underline-offset-2 hover:text-[var(--a-700)]"
      target={p.href?.startsWith("http") ? "_blank" : undefined}
      rel={p.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...p}
    />
  ),
  strong: (p: { children?: ReactNode }) => (
    <strong className="font-semibold text-slate-900" {...p} />
  ),
  blockquote: (p: { children?: ReactNode }) => (
    <blockquote className="my-6 border-l-4 border-blue-200 bg-blue-50/50 px-4 py-2 text-slate-700" {...p} />
  ),
  table: (p: { children?: ReactNode }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...p} />
    </div>
  ),
  th: (p: { children?: ReactNode }) => (
    <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold text-slate-800" {...p} />
  ),
  td: (p: { children?: ReactNode }) => (
    <td className="border border-slate-200 px-3 py-2 text-slate-700" {...p} />
  ),
};

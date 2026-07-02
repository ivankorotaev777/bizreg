"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface BlogCard {
  slug: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tagCode?: string;
  tagLabel?: string;
  date: string; // YYYY-MM-DD (dateModified || datePublished)
}

interface Props {
  posts: BlogCard[];
  tags: { code: string; label: string }[];
  locale: string;
  ui: {
    searchPlaceholder: string;
    updated: string;
    read: string;
    nothing: string;
    all: string;
  };
}

function fmtDate(d: string): string {
  const [y, m, day] = d.split("-");
  if (!y || !m || !day) return d;
  return `${day}.${m}.${y}`;
}

export default function BlogIndex({ posts, tags, locale, ui }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const okTag = active.size === 0 || (p.tagCode ? active.has(p.tagCode) : false);
      const okText =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tagLabel ?? "").toLowerCase().includes(q);
      return okTag && okText;
    });
  }, [posts, query, active]);

  const toggle = (code: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });

  return (
    <div>
      {/* Поиск */}
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ui.searchPlaceholder}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* Теги под строкой поиска */}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(new Set())}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              active.size === 0
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
            }`}
          >
            {ui.all}
          </button>
          {tags.map((t) => {
            const on = active.has(t.code);
            return (
              <button
                key={t.code}
                type="button"
                onClick={() => toggle(t.code)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  on
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Карточки */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-slate-500">{ui.nothing}</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {filtered.map((p) => (
            <li
              key={p.slug}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <Link href={`/blog/${p.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.imageAlt ?? p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-brand-100 to-brand-50" />
                  )}
                  {p.tagLabel && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
                      {p.tagLabel}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-semibold leading-snug text-slate-900">{p.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-xs text-slate-400">
                      {ui.updated}: {fmtDate(p.date)}
                    </span>
                    <span className="text-sm font-medium text-brand-600">{ui.read} →</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

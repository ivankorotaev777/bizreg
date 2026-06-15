import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/blog";

type Labels = { home: string; blog: string; updated: string; sources: string; cta: string };
const L: Record<string, Labels> = {
  ru: { home: "Главная", blog: "Блог", updated: "Актуально на", sources: "Источники", cta: "Получить консультацию" },
  en: { home: "Home", blog: "Blog", updated: "Last updated", sources: "Sources", cta: "Get a consultation" },
  zh: { home: "首页", blog: "博客", updated: "更新于", sources: "来源", cta: "获取咨询" },
};

function labels(locale: string) {
  return L[locale] ?? L.ru;
}

export function ArticleLayout({ post, children }: { post: Post; children: ReactNode }) {
  const t = labels(post.locale);
  const date = post.factsCheckedOn ?? post.dateModified ?? post.datePublished;

  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      {/* breadcrumb */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">{t.home}</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-slate-700">{t.blog}</Link>
      </nav>

      <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-lg text-slate-600">{post.description}</p>
      <p className="mt-4 text-sm text-slate-400">
        {t.updated} {date}
      </p>

      <div className="mt-8">{children}</div>

      {/* источники */}
      {post.sources && post.sources.length > 0 && (
        <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t.sources}
          </h2>
          <ul className="space-y-1 text-sm">
            {post.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                   className="text-blue-600 underline underline-offset-2">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA на профильную money-страницу */}
      {post.ctaPath && (
        <div className="mt-12 rounded-2xl bg-blue-600 p-6 text-center text-white sm:p-8">
          <p className="text-lg font-semibold">{post.ctaLabel ?? t.cta}</p>
          <Link
            href={post.ctaPath}
            className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            {t.cta} →
          </Link>
        </div>
      )}
    </article>
  );
}

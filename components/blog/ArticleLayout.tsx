import type { ReactNode } from "react";
import Image from "next/image";
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
    <article className="pb-16">
      {post.image ? (
        /* фото-герой на всю ширину */
        <header className="relative flex min-h-[440px] items-end overflow-hidden sm:min-h-[520px]">
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/55 to-slate-900/25" />
          <div className="relative mx-auto w-full max-w-3xl px-4 pb-10 pt-28 text-white">
            <nav className="mb-4 text-sm text-white/70">
              <Link href="/" className="hover:text-white">{t.home}</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">{t.blog}</Link>
            </nav>
            <h1 className="text-3xl font-bold leading-tight drop-shadow-sm sm:text-4xl lg:text-[2.9rem] lg:leading-[1.1]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">{post.description}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm text-white/80 ring-1 ring-white/25 backdrop-blur">
              {t.updated} {date}
            </p>
          </div>
        </header>
      ) : (
        <header className="bg-gradient-to-b from-brand-50 to-background pt-24 pb-10">
          <div className="mx-auto max-w-3xl px-4">
            <nav className="mb-5 text-sm text-slate-500">
              <Link href="/" className="hover:text-brand-600">{t.home}</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-brand-600">{t.blog}</Link>
            </nav>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{post.description}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm text-slate-500 ring-1 ring-slate-200">
              {t.updated} {date}
            </p>
          </div>
        </header>
      )}

      <div className="mx-auto mt-10 max-w-3xl px-4">{children}</div>

      <div className="mx-auto max-w-3xl px-4">
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
                     className="text-brand-600 underline underline-offset-2">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA на профильную money-страницу */}
        {post.ctaPath && (
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-center text-white">
            <p className="text-xl font-semibold">{post.ctaLabel ?? t.cta}</p>
            <Link
              href={post.ctaPath}
              className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              {t.cta} →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

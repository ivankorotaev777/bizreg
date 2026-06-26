import type { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/blog";
import { getAuthor, pick } from "@/lib/authors";
import { getToc, readingTime } from "@/lib/blog";
import { accentVars } from "./accents";

type Labels = {
  home: string; blog: string; updated: string; revised: string; sources: string; cta: string;
  author: string; role: string; reviewed: string; aboutTitle: string; about: string; contact: string;
  toc: string; read: string; allPosts: string;
};
const L: Record<string, Labels> = {
  ru: {
    home: "Главная", blog: "Блог", updated: "Актуально на", revised: "Обновлено", sources: "Источники", cta: "Получить консультацию",
    author: "Эксперты BizReg", role: "Регистрация бизнеса и бухгалтерия в Узбекистане",
    reviewed: "Факты сверены по первоисточникам (lex.uz, soliq.uz)",
    aboutTitle: "Кто мы и почему нам можно доверять",
    about: "BizReg (ООО «Ustores», Ташкент) помогает иностранцам открывать компании в Узбекистане под ключ — регистрация, юридический адрес, счёт и бухгалтерия. Более 1000 регистраций за 15 лет работы.",
    contact: "Консультация на русском и английском · +998 77 017 89 78",
    toc: "Содержание", read: "мин чтения", allPosts: "Все статьи",
  },
  en: {
    home: "Home", blog: "Blog", updated: "Last updated", revised: "Updated", sources: "Sources", cta: "Get a consultation",
    author: "BizReg Experts", role: "Company registration & accounting in Uzbekistan",
    reviewed: "Facts verified against primary sources (lex.uz, soliq.uz)",
    aboutTitle: "Who we are and why you can trust us",
    about: "BizReg (Ustores LLC, Tashkent) helps foreigners set up companies in Uzbekistan turnkey — registration, legal address, bank account and accounting. 1000+ registrations over 15 years.",
    contact: "Consultation in Russian and English · +998 77 017 89 78",
    toc: "Contents", read: "min read", allPosts: "All articles",
  },
  zh: {
    home: "首页", blog: "博客", updated: "更新于", revised: "已更新", sources: "来源", cta: "获取咨询",
    author: "BizReg 专家", role: "乌兹别克斯坦公司注册与会计",
    reviewed: "事实依据官方来源核对 (lex.uz, soliq.uz)",
    aboutTitle: "关于我们",
    about: "BizReg（Ustores 有限公司，塔什干）帮助外国人在乌兹别克斯坦一站式注册公司——注册、法律地址、银行账户与会计。15 年内完成 1000+ 注册。",
    contact: "提供俄语和英语咨询 · +998 77 017 89 78",
    toc: "目录", read: "分钟阅读", allPosts: "全部文章",
  },
};

function labels(locale: string) {
  return L[locale] ?? L.ru;
}

export function ArticleLayout({ post, children }: { post: Post; children: ReactNode }) {
  const t = labels(post.locale);
  const date = post.factsCheckedOn ?? post.dateModified ?? post.datePublished;
  // «Обновлено» показываем только если статью реально дорабатывали после публикации
  const revised =
    post.dateModified && post.dateModified > post.datePublished ? post.dateModified : null;
  const author = getAuthor(post.author);
  const authorName = pick(author.name, post.locale);
  const authorRole = pick(author.role, post.locale);
  const authorCreds = pick(author.credentials, post.locale);
  const toc = getToc(post.content);
  const rt = readingTime(post.content);

  return (
    <article className="pb-16" style={accentVars(post.accent)}>
      {(() => {
        const style = post.heroStyle || (post.image ? "photo" : "accent");
        const crumbW = (
          <nav className="mb-4 text-sm text-white/70">
            <Link href="/" className="hover:text-white">{t.home}</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white">{t.blog}</Link>
          </nav>
        );
        const metaPill = (
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm text-white/85 ring-1 ring-white/25 backdrop-blur">
            {t.updated} {date}
          </p>
        );

        // СПЛИТ: акцентная панель слева + фото справа
        if (style === "split" && post.image) {
          return (
            <header className="grid items-stretch lg:grid-cols-2">
              <div className="bg-gradient-to-br from-[var(--a-600)] to-[var(--a-700)] px-6 pb-12 pt-36 text-white sm:px-10 lg:pb-16">
                <div className="mx-auto max-w-xl lg:ml-auto lg:mr-0">
                  {crumbW}
                  <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:leading-[1.15]">{post.title}</h1>
                  <p className="mt-4 text-lg text-white/85">{post.description}</p>
                  {metaPill}
                </div>
              </div>
              <div className="relative min-h-[260px] lg:min-h-full">
                <Image src={post.image} alt={post.imageAlt ?? post.title} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </header>
          );
        }

        // АКЦЕНТ: цветная плашка-градиент с декоративным SVG-мотивом (свой цвет у каждой статьи)
        if (style === "accent" || !post.image) {
          return (
            <header className="relative overflow-hidden bg-gradient-to-br from-[var(--a-500)] to-[var(--a-700)] pt-36 pb-12 text-white">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-full w-2/3 text-white/10"
                viewBox="0 0 400 400"
                fill="none"
                preserveAspectRatio="xMaxYMid slice"
              >
                <circle cx="330" cy="70" r="170" stroke="currentColor" strokeWidth="2" />
                <circle cx="330" cy="70" r="115" stroke="currentColor" strokeWidth="2" />
                <circle cx="330" cy="70" r="62" stroke="currentColor" strokeWidth="2" />
                {Array.from({ length: 5 }).flatMap((_, r) =>
                  Array.from({ length: 7 }).map((_, c) => (
                    <circle key={`${r}-${c}`} cx={150 + c * 34} cy={250 + r * 26} r="2.5" fill="currentColor" />
                  )),
                )}
              </svg>
              <div className="relative mx-auto max-w-3xl px-4">
                {crumbW}
                <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.9rem] lg:leading-[1.1]">{post.title}</h1>
                <p className="mt-4 max-w-2xl text-lg text-white/85">{post.description}</p>
                {metaPill}
              </div>
            </header>
          );
        }

        // PHOTO (по умолчанию): фото на всю ширину с тёмным оверлеем
        return (
          <header className="relative flex min-h-[440px] items-end overflow-hidden sm:min-h-[520px]">
            <Image src={post.image!} alt={post.imageAlt ?? post.title} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/55 to-slate-900/25" />
            <div className="relative mx-auto w-full max-w-3xl px-4 pb-10 pt-36 text-white">
              {crumbW}
              <h1 className="text-3xl font-bold leading-tight drop-shadow-sm sm:text-4xl lg:text-[2.9rem] lg:leading-[1.1]">{post.title}</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/85">{post.description}</p>
              {metaPill}
            </div>
          </header>
        );
      })()}

      {/* byline (E-E-A-T) */}
      <div className="mx-auto mt-8 max-w-3xl px-4">
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <Image
            src={author.photo}
            alt={authorName}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 text-sm">
            <p className="font-semibold text-slate-900">{authorName}</p>
            <p className="text-slate-500">{authorRole}</p>
            <p className="mt-0.5 text-xs text-slate-400">{authorCreds}</p>
          </div>
          <div className="ml-auto hidden shrink-0 text-right text-xs text-slate-400 sm:block">
            <p>{t.updated} {date} · {rt} {t.read}</p>
            <p className="mt-0.5 text-emerald-600">✓ {post.reviewedBy ?? t.reviewed}</p>
          </div>
        </div>
        {/* мобильная строка доверия */}
        <p className="mt-2 text-xs text-slate-400 sm:hidden">
          {t.updated} {date} · {rt} {t.read} · <span className="text-emerald-600">✓ {post.reviewedBy ?? t.reviewed}</span>
        </p>
        {revised && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[var(--a-50)] px-2.5 py-1 text-xs font-medium text-[var(--a-700)] ring-1 ring-[var(--a-100)]">
            ↻ {t.revised}: {revised}
          </p>
        )}
      </div>

      {/* оглавление (TOC) */}
      {toc.length > 2 && (
        <nav className="mx-auto mt-6 max-w-3xl px-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{t.toc}</p>
            <ol className="space-y-2 text-sm">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="flex gap-2 text-slate-700 hover:text-[var(--a-600)]">
                    <span className="text-[var(--a-400)]">{i + 1}.</span> {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      <div className="mx-auto mt-8 max-w-3xl px-4">{children}</div>

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
                     className="text-[var(--a-600)] underline underline-offset-2">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* блок доверия об авторе/компании (E-E-A-T) */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-semibold text-slate-900">{t.aboutTitle}</h2>
          <div className="flex gap-4">
            <Image
              src={author.photo}
              alt={authorName}
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-slate-900">{authorName}</p>
              <p className="text-sm text-[var(--a-700)]">{authorRole}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{authorCreds}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">{t.about}</p>
          <p className="mt-3 text-sm font-medium text-[var(--a-700)]">{t.contact}</p>
        </section>

        {/* CTA на профильную money-страницу */}
        {post.ctaPath && (
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-[var(--a-500)] to-[var(--a-700)] p-8 text-center text-white">
            <p className="text-xl font-semibold">{post.ctaLabel ?? t.cta}</p>
            <Link
              href={post.ctaPath}
              className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-[var(--a-700)] transition hover:bg-[var(--a-50)]"
            >
              {t.cta} →
            </Link>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/blog" className="text-sm font-medium text-[var(--a-600)] hover:text-[var(--a-700)]">
            ← {t.allPosts}
          </Link>
        </div>
      </div>
    </article>
  );
}

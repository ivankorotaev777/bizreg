import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllPostMeta } from "@/lib/blog";
import { clusterTag } from "@/lib/tags";
import { pageMetadata } from "@/lib/seo/metadata";
import BlogIndex, { type BlogCard } from "@/components/blog/BlogIndex";

type BlogLabels = {
  title: string;
  desc: string;
  empty: string;
  searchPlaceholder: string;
  updated: string;
  read: string;
  nothing: string;
  all: string;
};

const T: Record<string, BlogLabels> = {
  ru: {
    title: "Блог о бизнесе в Узбекистане",
    desc: "Налоги, НДС, ВНЖ, регистрация компании и релокация в Узбекистан — гайды и разборы для предпринимателей.",
    empty: "Скоро здесь появятся статьи.",
    searchPlaceholder: "Поиск по статьям и тегам…",
    updated: "Обновлено",
    read: "Читать",
    nothing: "Ничего не найдено. Измените запрос или снимите фильтры.",
    all: "Все",
  },
  en: {
    title: "Blog: doing business in Uzbekistan",
    desc: "Taxes, VAT, residence, company registration and relocation to Uzbekistan — guides for entrepreneurs.",
    empty: "Articles coming soon.",
    searchPlaceholder: "Search articles and tags…",
    updated: "Updated",
    read: "Read",
    nothing: "Nothing found. Try another query or clear the filters.",
    all: "All",
  },
  zh: {
    title: "乌兹别克斯坦营商博客",
    desc: "税务、增值税、居留、公司注册与迁移指南。",
    empty: "文章即将上线。",
    searchPlaceholder: "搜索文章和标签…",
    updated: "已更新",
    read: "阅读",
    nothing: "未找到内容。",
    all: "全部",
  },
};

function t(locale: string) {
  return T[locale] ?? T.ru;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const tt = t(locale);
  return pageMetadata({
    locale,
    path: "/blog",
    localesAvailable: ["ru", "en"],
    title: `${tt.title} | BizReg`,
    description: tt.desc,
  });
}

export default async function BlogIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tt = t(locale);
  const posts = getAllPostMeta(locale);

  const cards: BlogCard[] = posts.map((p) => {
    const tag = clusterTag(p.cluster, locale);
    return {
      slug: p.slug,
      title: p.title,
      description: p.description,
      image: p.image,
      imageAlt: p.imageAlt,
      tagCode: tag?.code,
      tagLabel: tag?.label,
      date: p.dateModified || p.datePublished,
    };
  });

  // Уникальные теги, присутствующие в статьях — по возрастанию кода (C1, C3, …).
  const tagMap = new Map<string, { code: string; label: string }>();
  for (const c of cards) {
    if (c.tagCode && c.tagLabel && !tagMap.has(c.tagCode)) {
      tagMap.set(c.tagCode, { code: c.tagCode, label: c.tagLabel });
    }
  }
  const tags = [...tagMap.values()].sort(
    (a, b) => Number(a.code.slice(1)) - Number(b.code.slice(1)),
  );

  return (
    <main className="pt-20 pb-16">
      <section className="bg-gradient-to-b from-brand-50 to-background py-12 sm:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
            {tt.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{tt.desc}</p>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 pt-8">
        {cards.length === 0 ? (
          <p className="mt-10 text-slate-500">{tt.empty}</p>
        ) : (
          <BlogIndex
            posts={cards}
            tags={tags}
            locale={locale}
            ui={{
              searchPlaceholder: tt.searchPlaceholder,
              updated: tt.updated,
              read: tt.read,
              nothing: tt.nothing,
              all: tt.all,
            }}
          />
        )}
      </div>
    </main>
  );
}

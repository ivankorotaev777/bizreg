import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPostMeta } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo/metadata";

type BlogLabels = { title: string; desc: string; empty: string };
const T: Record<string, BlogLabels> = {
  ru: { title: "Блог о бизнесе в Узбекистане", desc: "Налоги, НДС, ВНЖ, регистрация компании и релокация в Узбекистан — гайды и разборы для предпринимателей.", empty: "Скоро здесь появятся статьи." },
  en: { title: "Blog: doing business in Uzbekistan", desc: "Taxes, VAT, residence, company registration and relocation to Uzbekistan — guides for entrepreneurs.", empty: "Articles coming soon." },
  zh: { title: "乌兹别克斯坦营商博客", desc: "税务、增值税、居留、公司注册与迁移指南。", empty: "文章即将上线。" },
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
    localesAvailable: ["ru", "en", "zh"],
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

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{tt.title}</h1>
      <p className="mt-3 text-lg text-slate-600">{tt.desc}</p>

      {posts.length === 0 ? (
        <p className="mt-10 text-slate-500">{tt.empty}</p>
      ) : (
        <ul className="mt-10 space-y-6">
          {posts.map((p) => (
            <li key={p.slug} className="rounded-xl border border-slate-200 p-5 transition hover:border-slate-300 hover:shadow-sm">
              <Link href={`/blog/${p.slug}`} className="block">
                <h2 className="text-xl font-semibold text-slate-900">{p.title}</h2>
                <p className="mt-2 text-slate-600">{p.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-blue-600">
                  {locale === "ru" ? "Читать →" : locale === "zh" ? "阅读 →" : "Read →"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

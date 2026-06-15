import type { Metadata } from "next";
import Image from "next/image";
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
    <main className="pt-20 pb-16">
      <section className="bg-gradient-to-b from-brand-50 to-background py-12 sm:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
            {tt.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{tt.desc}</p>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4">
        {posts.length === 0 ? (
          <p className="mt-10 text-slate-500">{tt.empty}</p>
        ) : (
          <ul className="-mt-6 grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <li key={p.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-200 hover:shadow-md">
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
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-semibold leading-snug text-slate-900">{p.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>
                    <span className="mt-4 inline-block text-sm font-medium text-brand-600">
                      {locale === "ru" ? "Читать →" : locale === "zh" ? "阅读 →" : "Read →"}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getPost, getAllPostParams, getPostLocales } from "@/lib/blog";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { mdxComponents } from "@/components/blog/mdxComponents";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema, faqSchema, howToSchema } from "@/lib/seo/schema";
import { localizedUrl } from "@/lib/seo/site";
import { getAuthor, pick } from "@/lib/authors";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostParams().map((p) => ({ locale: p.locale, slug: p.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = getPost(slug, locale);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    localesAvailable: getPostLocales(slug),
    title: `${post.title} | BizReg`,
    description: post.description,
    type: "article",
    image: post.image,
  });
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();

  const url = localizedUrl(locale, `/blog/${slug}`);
  const author = getAuthor(post.author);
  const schema: object[] = [
    articleSchema({
      headline: post.title,
      description: post.description,
      url,
      datePublished: post.datePublished,
      dateModified: post.dateModified ?? post.factsCheckedOn,
      locale,
      authorName: pick(author.name, locale),
      authorJobTitle: pick(author.role, locale),
    }),
    breadcrumbSchema(
      [
        { name: locale === "ru" ? "Главная" : "Home", path: "/" },
        { name: locale === "ru" ? "Блог" : "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${slug}` },
      ],
      locale,
    ),
  ];
  if (post.faq?.length) schema.push(faqSchema(post.faq));

  // HowTo: если в статье есть пошаговый блок <Steps> (≥3 <Step title="…">) — отдаём HowTo-разметку
  const steps = [...post.content.matchAll(/<Step\b[^>]*\btitle="([^"]+)"[^>]*>([\s\S]*?)<\/Step>/g)].map((m) => ({
    name: m[1],
    text: m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 300),
  }));
  if (steps.length >= 3) {
    schema.push(howToSchema({ name: post.title, description: post.description, url, steps }));
  }

  return (
    <>
      <JsonLd data={schema} />
      <ArticleLayout post={post}>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
        />
      </ArticleLayout>
    </>
  );
}

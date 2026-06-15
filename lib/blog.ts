// Чтение блог-статей из content/blog/<slug>.<locale>.mdx
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  datePublished: string; // YYYY-MM-DD
  dateModified?: string;
  cluster?: string;
  ctaPath?: string;   // путь на профильную money-страницу
  ctaLabel?: string;
  faq?: { q: string; a: string }[];
  sources?: { title: string; url: string }[];
  factsCheckedOn?: string; // дата проверки фактов (актуально на)
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  locale: string;
}

export interface Post extends PostMeta {
  content: string; // сырой MDX
}

function parseFile(file: string): { slug: string; locale: string } | null {
  const m = file.match(/^(.+)\.([a-z]{2})\.mdx$/);
  if (!m) return null;
  return { slug: m[1], locale: m[2] };
}

export function getAllPostMeta(locale: string): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const posts: PostMeta[] = [];
  for (const file of fs.readdirSync(BLOG_DIR)) {
    const parsed = parseFile(file);
    if (!parsed || parsed.locale !== locale) continue;
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    const fm = data as PostFrontmatter;
    if (fm.draft) continue;
    posts.push({ ...fm, slug: parsed.slug, locale: parsed.locale });
  }
  return posts.sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

export function getPost(slug: string, locale: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.${locale}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return { ...fm, slug, locale, content };
}

/** Все (slug, locale) пары — для generateStaticParams и sitemap. */
export function getAllPostParams(): { slug: string; locale: string }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const out: { slug: string; locale: string }[] = [];
  for (const file of fs.readdirSync(BLOG_DIR)) {
    const parsed = parseFile(file);
    if (!parsed) continue;
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    if ((data as PostFrontmatter).draft) continue;
    out.push(parsed);
  }
  return out;
}

/** Локали, в которых существует статья (для hreflang). */
export function getPostLocales(slug: string): string[] {
  return getAllPostParams().filter((p) => p.slug === slug).map((p) => p.locale);
}

import { getAllPostMeta } from "@/lib/blog";
import { SITE } from "@/lib/seo/site";

// /llms.txt — указатель ключевого контента для LLM/ИИ-поиска (https://llmstxt.org).
// Markdown-формат: краткое описание + ссылки на статьи с описаниями.
export const dynamic = "force-static";

export function GET() {
  const base = SITE.url;
  const posts = getAllPostMeta("ru");
  const lines: string[] = [];

  lines.push(`# ${SITE.name} — регистрация компаний и бухгалтерия в Узбекистане для иностранцев`);
  lines.push("");
  lines.push(
    `> ${SITE.name} (${SITE.legalName}, Ташкент) помогает иностранцам открывать компании в Узбекистане под ключ: ` +
      `регистрация ООО и иностранного предприятия, юридический адрес, банковский счёт, бухгалтерия, IT Park, ВНЖ и разрешения на работу. ` +
      `Все факты в статьях сверены по первоисточникам (lex.uz, soliq.uz, it-park.uz, cbu.uz) с датой проверки. Языки: русский и английский.`,
  );
  lines.push("");
  lines.push("## Экспертные статьи");
  for (const p of posts) {
    const desc = (p.description || "").replace(/\s+/g, " ").trim();
    lines.push(`- [${p.title}](${base}/blog/${p.slug}): ${desc}`);
  }
  lines.push("");
  lines.push("## Основное");
  lines.push(`- [Блог](${base}/blog): все статьи (ru) · [English blog](${base}/en/blog)`);
  lines.push(`- [О компании](${base}/about)`);
  lines.push(`- [Контакты](${base}/contacts): тел. ${SITE.phone}`);
  lines.push(`- [Карта сайта](${base}/sitemap.xml)`);
  lines.push("");

  return new Response(lines.join("\n") + "\n", {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

#!/usr/bin/env node
// Аудит блог-страниц перед деплоем (git pre-push gate).
// Проверяет SEO/E-E-A-T/ассеты каждой статьи в content/blog/*.mdx.
// ERROR -> блокирует push (exit 1). WARN -> не блокирует.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BLOG = path.join(ROOT, "content", "blog");
const PUBLIC = path.join(ROOT, "public");
const VALID_AUTHORS = ["ivan", "yaroslav", "karima"];

let errors = 0;
let warns = 0;
const err = (f, m) => { console.error(`  \x1b[31m✗ ERROR\x1b[0m [${f}] ${m}`); errors++; };
const warn = (f, m) => { console.warn(`  \x1b[33m⚠ WARN\x1b[0m  [${f}] ${m}`); warns++; };

if (!fs.existsSync(BLOG)) {
  console.log("Нет content/blog — аудит пропущен.");
  process.exit(0);
}

const files = fs.readdirSync(BLOG).filter((f) => f.endsWith(".mdx"));
const bySlug = {};
for (const file of files) {
  const m = file.match(/^(.+)\.([a-z]{2})\.mdx$/);
  if (!m) { warn(file, "имя файла не вида <slug>.<locale>.mdx"); continue; }
  (bySlug[m[1]] ??= []).push({ file, locale: m[2] });
}

console.log(`\n🔍 Аудит блога: ${files.length} файлов, ${Object.keys(bySlug).length} статей\n`);

for (const [slug, variants] of Object.entries(bySlug)) {
  // парность локалей (hreflang): желательны ru + en
  const locales = variants.map((v) => v.locale);
  if (!locales.includes("ru")) warn(slug, "нет ru-версии");
  if (!locales.includes("en")) warn(slug, "нет en-версии (hreflang/охват en)");

  for (const { file, locale } of variants) {
    const raw = fs.readFileSync(path.join(BLOG, file), "utf-8");
    const { data: fm, content } = matter(raw);
    const F = `${slug}.${locale}`;

    // обязательные поля
    if (!fm.title) err(F, "нет title");
    else if (fm.title.length > 65) warn(F, `title длинный (${fm.title.length}>65)`);
    if (!fm.description) err(F, "нет description");
    else if (fm.description.length > 160) warn(F, `description длинный (${fm.description.length}>160)`);
    else if (fm.description.length < 50) warn(F, `description короткий (${fm.description.length}<50)`);
    if (!fm.datePublished) err(F, "нет datePublished");
    if (!fm.factsCheckedOn) warn(F, "нет factsCheckedOn (дата проверки фактов)");

    // E-E-A-T: автор
    if (!fm.author) err(F, "нет author");
    else if (!VALID_AUTHORS.includes(fm.author)) err(F, `неизвестный author "${fm.author}" (ожидается: ${VALID_AUTHORS.join("/")})`);

    // YMYL: источники
    if (!Array.isArray(fm.sources) || fm.sources.length === 0) err(F, "нет sources (YMYL — нужны первоисточники)");

    // FAQ для schema
    if (!Array.isArray(fm.faq) || fm.faq.length < 3) warn(F, "меньше 3 FAQ (слабее FAQPage schema)");

    // hero-изображение существует
    if (!fm.image) warn(F, "нет image (нет фото-героя и OG-картинки)");
    else if (!fs.existsSync(path.join(PUBLIC, fm.image.replace(/^\//, "")))) err(F, `image не найден в public: ${fm.image}`);

    // структура контента
    const h2 = (content.match(/^##\s+/gm) || []).length;
    if (h2 < 2) warn(F, `мало разделов h2 (${h2})`);
    const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    if (words < 300) warn(F, `мало текста (~${words} слов)`);

    // изображения в контенте: у Figure должен быть alt
    const figs = content.match(/<Figure\b[^>]*>/g) || [];
    for (const fig of figs) {
      if (!/\balt=/.test(fig)) err(F, "у <Figure> нет alt");
      if (!/\bsrc=/.test(fig)) err(F, "у <Figure> нет src");
    }
    // проверим, что src фигур существуют
    for (const m2 of content.matchAll(/<Figure\b[^>]*\bsrc="([^"]+)"/g)) {
      const p = m2[1];
      if (p.startsWith("/") && !fs.existsSync(path.join(PUBLIC, p.replace(/^\//, "")))) {
        err(F, `<Figure src> не найден в public: ${p}`);
      }
    }

    // сырые markdown-таблицы без GFM не ломаются (remark-gfm включён) — просто инфо
  }
}

console.log(`\n— Итог: ${errors} ошибок, ${warns} предупреждений —`);
if (errors > 0) {
  console.error("\n\x1b[31mАудит не пройден. Push заблокирован. Исправь ERROR выше.\x1b[0m\n");
  process.exit(1);
}
console.log("\x1b[32m✓ Аудит пройден.\x1b[0m\n");
process.exit(0);

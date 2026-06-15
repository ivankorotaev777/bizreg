#!/usr/bin/env node
// Полный аудит блог-страниц перед деплоем (git pre-push gate).
// ERROR -> блокирует push (exit 1). WARN -> не блокирует.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BLOG = path.join(ROOT, "content", "blog");
const PUBLIC = path.join(ROOT, "public");
const VALID_AUTHORS = ["ivan", "yaroslav", "karima"];
// Известные маршруты сайта (для проверки внутренних ссылок/CTA)
const STATIC_ROUTES = new Set([
  "/", "/about", "/contacts", "/payment", "/guarantees", "/clients",
  "/price_list_full", "/itpark", "/blog", "/thank_you",
]);
// Авторитетные источники (YMYL)
const TRUSTED_SRC = ["lex.uz", "soliq.uz", "it-park.uz", "cbu.uz", "gov.uz", "stat.uz", "norma.uz", "nrm.uz", "buxgalter.uz"];
const PLACEHOLDERS = ["lorem ipsum", "todo", "tbd", "placeholder", "уточняется", "xxx"];

let errors = 0, warns = 0;
const err = (f, m) => { console.error(`  \x1b[31m✗ ERROR\x1b[0m [${f}] ${m}`); errors++; };
const warn = (f, m) => { console.warn(`  \x1b[33m⚠ WARN\x1b[0m  [${f}] ${m}`); warns++; };

if (!fs.existsSync(BLOG)) { console.log("Нет content/blog — аудит пропущен."); process.exit(0); }

const files = fs.readdirSync(BLOG).filter((f) => f.endsWith(".mdx"));
const posts = [];
const bySlug = {};
for (const file of files) {
  const m = file.match(/^(.+)\.([a-z]{2})\.mdx$/);
  if (!m) { warn(file, "имя не вида <slug>.<locale>.mdx"); continue; }
  const raw = fs.readFileSync(path.join(BLOG, file), "utf-8");
  const { data: fm, content } = matter(raw);
  const p = { file, slug: m[1], locale: m[2], fm, content };
  posts.push(p);
  (bySlug[m[1]] ??= []).push(p);
}
const KNOWN_SLUGS = new Set(Object.keys(bySlug));

console.log(`\n🔍 Полный аудит блога: ${files.length} файлов, ${KNOWN_SLUGS.size} статей\n`);

function checkInternalLink(F, href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
  if (/^https?:\/\//.test(href)) return; // внешняя
  if (!href.startsWith("/")) { warn(F, `относительная ссылка без / : "${href}"`); return; }
  const clean = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (STATIC_ROUTES.has(clean)) return;
  const bm = clean.match(/^\/blog\/(.+)$/);
  if (bm) {
    if (!KNOWN_SLUGS.has(bm[1])) err(F, `битая ссылка на несуществующую статью: ${href}`);
    return;
  }
  err(F, `битая внутренняя ссылка (нет такого маршрута): ${href}`);
}

// --- кросс-проверка: одно фото не должно использоваться в разных статьях ---
const imgUsage = {}; // image -> Set(slug)
for (const p of posts) {
  const imgs = new Set();
  if (p.fm.image) imgs.add(p.fm.image);
  for (const m of p.content.matchAll(/<Figure\b[^>]*\bsrc="([^"]+)"/g)) imgs.add(m[1]);
  for (const img of imgs) (imgUsage[img] ??= new Set()).add(p.slug);
}
for (const [img, slugs] of Object.entries(imgUsage)) {
  if (slugs.size > 1) err("ФОТО", `повтор изображения ${img} в разных статьях: ${[...slugs].join(", ")} — каждое фото уникально для своей статьи`);
}

// --- кросс-проверки: дубли title/description в пределах локали ---
const seenTitle = {}, seenDesc = {};
for (const p of posts) {
  const k = `${p.locale}:${(p.fm.title || "").trim().toLowerCase()}`;
  if (p.fm.title) { if (seenTitle[k]) err(`${p.slug}.${p.locale}`, `дубль title с ${seenTitle[k]}`); else seenTitle[k] = p.slug; }
  const dk = `${p.locale}:${(p.fm.description || "").trim().toLowerCase()}`;
  if (p.fm.description) { if (seenDesc[dk]) err(`${p.slug}.${p.locale}`, `дубль description с ${seenDesc[dk]}`); else seenDesc[dk] = p.slug; }
}

// --- парность локалей ---
for (const [slug, vs] of Object.entries(bySlug)) {
  const locs = vs.map((v) => v.locale);
  if (!locs.includes("ru")) warn(slug, "нет ru-версии");
  if (!locs.includes("en")) warn(slug, "нет en-версии (hreflang/охват en)");
}

// --- по каждой статье ---
for (const { slug, locale, fm, content } of posts) {
  const F = `${slug}.${locale}`;

  // обязательные поля + длины
  if (!fm.title) err(F, "нет title");
  else { if (fm.title.length > 65) warn(F, `title длинный (${fm.title.length}>65)`); if (fm.title.length < 15) warn(F, `title короткий (${fm.title.length}<15)`); }
  if (!fm.description) err(F, "нет description");
  else { if (fm.description.length > 160) warn(F, `description длинный (${fm.description.length}>160)`); if (fm.description.length < 50) warn(F, `description короткий (${fm.description.length}<50)`); }
  if (!fm.datePublished) err(F, "нет datePublished");
  if (!fm.dateModified) warn(F, "нет dateModified");
  if (!fm.factsCheckedOn) warn(F, "нет factsCheckedOn");
  if (fm.datePublished && fm.dateModified && fm.dateModified < fm.datePublished) err(F, "dateModified < datePublished");
  if (!fm.cluster) warn(F, "нет cluster (метка кластера)");

  // E-E-A-T автор
  if (!fm.author) err(F, "нет author");
  else if (!VALID_AUTHORS.includes(fm.author)) err(F, `неизвестный author "${fm.author}" (ожидается: ${VALID_AUTHORS.join("/")})`);

  // YMYL источники
  if (!Array.isArray(fm.sources) || fm.sources.length === 0) err(F, "нет sources (YMYL)");
  else {
    let trusted = 0;
    for (const s of fm.sources) {
      if (!s.title || !s.url) err(F, "источник без title/url");
      else { if (!/^https?:\/\//.test(s.url)) err(F, `источник с некорректным url: ${s.url}`); if (TRUSTED_SRC.some((d) => (s.url || "").includes(d))) trusted++; }
    }
    if (trusted === 0) warn(F, "среди источников нет официальных (lex.uz/soliq.uz/it-park.uz и т.п.)");
  }

  // FAQ
  if (!Array.isArray(fm.faq) || fm.faq.length < 3) warn(F, `FAQ < 3 (${(fm.faq || []).length})`);
  else for (const q of fm.faq) if (!q.q || !q.a) err(F, "FAQ-элемент без q/a");

  // hero image
  if (!fm.image) warn(F, "нет image (нет фото-героя и OG)");
  else {
    const abs = path.join(PUBLIC, fm.image.replace(/^\//, ""));
    if (!fs.existsSync(abs)) err(F, `image не найден: ${fm.image}`);
    else { const kb = fs.statSync(abs).size / 1024; if (kb > 600) warn(F, `hero тяжёлый (${Math.round(kb)}KB > 600)`); }
    if (!fm.imageAlt) warn(F, "нет imageAlt");
  }

  // структура контента
  const h2 = (content.match(/^##\s+/gm) || []).length;
  if (h2 < 3) warn(F, `мало разделов h2 (${h2})`);
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 1200) warn(F, `мало текста (~${words} слов, цель — лонгрид 1200+)`);
  if (!/<Lead>/.test(content)) warn(F, "нет вводного <Lead>");
  if (!/<(Faq|FaqList)\b/.test(content)) warn(F, "нет FAQ-блока в теле статьи");

  // плейсхолдеры
  const low = content.toLowerCase();
  for (const ph of PLACEHOLDERS) if (low.includes(ph)) warn(F, `найден плейсхолдер "${ph}"`);

  // Figures: alt/src/существование
  for (const fig of content.match(/<Figure\b[^>]*\/?>/g) || []) {
    if (!/\balt="[^"]{3,}"/.test(fig)) err(F, "у <Figure> нет/короткий alt");
    const sm = fig.match(/\bsrc="([^"]+)"/);
    if (!sm) err(F, "у <Figure> нет src");
    else if (sm[1].startsWith("/") && !fs.existsSync(path.join(PUBLIC, sm[1].replace(/^\//, "")))) err(F, `<Figure src> не найден: ${sm[1]}`);
  }

  // CTA-таргет
  if (!fm.ctaPath) warn(F, "нет ctaPath (нет конверсионного CTA)");
  else checkInternalLink(F, fm.ctaPath);

  // внутренние ссылки в контенте: href="..." и markdown ](/...)
  for (const m of content.matchAll(/\bhref="([^"]+)"/g)) checkInternalLink(F, m[1]);
  for (const m of content.matchAll(/\]\((\/[^)\s]+)\)/g)) checkInternalLink(F, m[1]);
}

console.log(`\n— Итог: ${errors} ошибок, ${warns} предупреждений —`);
if (errors > 0) { console.error("\n\x1b[31mАудит не пройден. Push заблокирован.\x1b[0m\n"); process.exit(1); }
console.log("\x1b[32m✓ Аудит пройден.\x1b[0m\n");
process.exit(0);

export const today = () => new Date().toISOString().slice(0, 10);

const STD =
  "Сначала прочитай файл .claude/skills/bizreg-blog-article/SKILL.md и строго следуй этому стандарту " +
  "(уникальность и разный дизайн, SEO-оптимальность с порогом score ≥85, покрытие целевых ключей кластера, " +
  "AEO: <KeyTakeaways> + ≥1 H2-вопрос + BLUF, Tier-1 факты с датами, фактические инварианты §11). " +
  "КРИТИЧНО по MDX: никогда не вкладывай двойные кавычки внутрь JSX-атрибутов (используй «ёлочки»). " +
  "НЕ делай git commit и git push — только правь файлы.";

export interface Topic {
  slug: string;
  title: string;
  keyword: string;
}

export function enrichmentPrompt(slug: string, note: string): string {
  return `Ты — редактор контента BizReg. ${STD}

Задача: дополнить существующую статью «${slug}» на основе заметки менеджера (расшифровка голосового):
«${note}»

Шаги:
1. Прочитай обе версии: content/blog/${slug}.ru.mdx и content/blog/${slug}.en.mdx.
2. Органично интегрируй информацию из заметки в ОБЕ версии (ru и en), сохраняя стиль и структуру, не дублируя уже написанное.
3. Проверь новые факты по первоисточникам Tier-1 (lex.uz, soliq.uz, it-park.uz, cbu.uz, gov.uz) через web-поиск. Не выдумывай цифры. При необходимости обнови sources и factsCheckedOn.
4. Проставь dateModified: "${today()}" в обеих версиях.
5. Запусти \`npm run audit:blog\`; добейся 0 ERROR и SEO-score ≥85 для этой статьи. (build не запускай — это лишние токены.)

В САМОМ КОНЦЕ выведи ровно одну строку:
SUMMARY: <что добавил/изменил, на русском, до 200 символов>`;
}

export function writePrompt(topic: Topic): string {
  return `Ты — редактор контента BizReg. ${STD}

Задача: создай НОВУЮ статью.
Тема: «${topic.title}»
Ключевая фраза (ru): «${topic.keyword}»
Желаемый slug: ${topic.slug}

Шаги:
1. Убедись, что content/blog/${topic.slug}.ru.mdx ещё не существует; если занят — выбери близкий незанятый латинский slug.
2. Создай content/blog/<slug>.ru.mdx и content/blog/<slug>.en.mdx по стандарту: 1200+ слов/язык, уникальный дизайн (accent/heroStyle), <Lead>, ≥3 внутренние ссылки, ≥5 FAQ, 2–3 CTA, <KeyTakeaways>, ≥1 H2-вопрос, уникальное hero-фото (не дублируй существующие в /public/blog).
3. Факты — только Tier-1, с датами и источниками. datePublished и dateModified: "${today()}".
4. Запусти \`npm run audit:blog\`; добейся 0 ERROR и SEO-score ≥85 для своей статьи. (build не запускай — это лишние токены.)

В КОНЦЕ выведи ровно одну строку:
SUMMARY: <финальный-slug> — <заголовок ru>`;
}

export function planPrompt(count: number, topics: string[]): string {
  const hint =
    topics.length > 0
      ? `Приоритетно учти пожелания заказчика по темам: ${topics.join("; ")}.\n`
      : "";
  return `Ты — контент-стратег BizReg (регистрация компаний и бухгалтерия в Узбекистане для иностранцев).
Изучи существующие статьи: посмотри список файлов content/blog/*.ru.mdx и их frontmatter (title, keyword), чтобы не повторяться.
${hint}Предложи ${count} НОВЫХ тем с высоким коммерческим и поисковым потенциалом, которых ещё нет в блоге.

Верни ТОЛЬКО валидный JSON-массив, без markdown-обрамления и без пояснений, ровно ${count} элементов:
[{"slug":"latin-kebab","title":"Заголовок ru ≤65 символов, включающий ключ","keyword":"ключевая фраза ru"}]
slug — латиницей, уникальный, не совпадает с существующими файлами.`;
}

export function fixPrompt(auditOutput: string): string {
  return `Гейт публикации не пройден. Вывод \`npm run audit:blog\`:
---
${auditOutput.slice(-6000)}
---
Прочитай .claude/skills/bizreg-blog-article/SKILL.md и исправь ВСЕ ERROR (и по возможности подтяни SEO-score <85 до ≥85) в затронутых статьях. Не ломай MDX (никаких вложенных двойных кавычек в JSX-атрибутах). Запусти \`npm run audit:blog\` снова, добейся 0 ERROR. НЕ делай git commit/push.
В конце выведи: SUMMARY: исправлено`;
}

/**
 * Факт-чек: верификатор (READ-ONLY) сверяет каждое числовое/правовое утверждение
 * статьи с первоисточниками Tier-1 и выдаёт структурированный VERDICT.
 */
export function factCheckPrompt(slugs: string[]): string {
  const files = slugs
    .flatMap((s) => [`content/blog/${s}.ru.mdx`, `content/blog/${s}.en.mdx`])
    .map((f) => `- ${f}`)
    .join("\n");
  return `Ты — независимый фактчекер BizReg (YMYL: налоги и регистрация компаний в Узбекистане). Тебе НЕЛЬЗЯ править файлы — только проверять и выносить вердикт.

Проверь статьи (где есть, обе локали):
${files}

Метод:
1. Прочитай файлы. Выпиши КАЖДОЕ проверяемое утверждение: налоговые ставки (НДС, налог с оборота, на прибыль, НДФЛ, соцналог), размеры госпошлин и БРВ, сроки/дедлайны, уставный капитал, условия и стоимость ВНЖ, льготы IT Park, требования по счетам/валюте, даты вступления норм в силу.
2. Для каждого утверждения проверь актуальное значение по первоисточнику Tier-1 через WebFetch/WebSearch: lex.uz, soliq.uz, it-park.uz, cbu.uz, gov.uz, stat.uz. Доверяй ТОЛЬКО первоисточнику, не блогам/агрегаторам.
3. Проверь массив frontmatter sources: ссылки живые и реально подтверждают заявленное (а не просто «релевантный домен»).
4. Учитывай свежесть: не изменилась ли норма в последние 6–12 месяцев.

Классификация:
- "blocking" — неверная/устаревшая цифра или норма, либо ключевое утверждение, которое нельзя подтвердить ни одним Tier-1 источником.
- "advisory" — мелкая неточность, отсутствие прямой ссылки при правдоподобности, формулировка.

В САМОМ КОНЦЕ выведи РОВНО одну строку — машиночитаемый вердикт (валидный JSON, без markdown):
VERDICT: {"pass": true|false, "issues": [{"claim":"...","where":"slug.ru","problem":"...","correct":"верно по источнику","source":"https://lex.uz/...","severity":"blocking|advisory"}]}
pass=true только если нет ни одной blocking-проблемы. Если всё верно — VERDICT: {"pass": true, "issues": []}`;
}

/** Факт-фикс: исправляет статьи строго по найденным blocking-проблемам. */
export function factFixPrompt(issues: string): string {
  return `Факт-чек статьи выявил фактические ошибки (YMYL). Исправь их в затронутых статьях (обе локали ru и en).

Проблемы:
${issues}

Требования:
1. Приведи каждое значение в соответствие с первоисточником Tier-1 (перепроверь сам через WebFetch lex.uz/soliq.uz/it-park.uz/cbu.uz — НЕ доверяй слепо строке «correct»).
2. Обнови frontmatter sources (добавь/поправь точные ссылки) и factsCheckedOn: сегодняшняя дата. Проставь dateModified.
3. Не ломай MDX (никаких вложенных двойных кавычек в JSX-атрибутах), сохрани стиль и SEO (audit:blog должен остаться 0 ERROR — прогони его).
4. НЕ делай git commit/push.
В конце выведи: SUMMARY: исправлены факты`;
}

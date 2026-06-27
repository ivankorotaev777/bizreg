export const today = () => new Date().toISOString().slice(0, 10);

const STD =
  "Сначала прочитай файл .claude/skills/bizreg-blog-article/SKILL.md и строго следуй этому стандарту " +
  "(уникальность и разный дизайн, SEO-оптимальность с порогом score ≥70, AEO: <KeyTakeaways> + ≥1 H2-вопрос + BLUF, " +
  "Tier-1 факты с датами, фактические инварианты §11). " +
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
5. Запусти \`npm run audit:blog\`; добейся 0 ERROR и SEO-score ≥70 для этой статьи. (build не запускай — это лишние токены.)

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
4. Запусти \`npm run audit:blog\`; добейся 0 ERROR и SEO-score ≥70 для своей статьи. (build не запускай — это лишние токены.)

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
Прочитай .claude/skills/bizreg-blog-article/SKILL.md и исправь ВСЕ ERROR (и по возможности подтяни SEO-score <70 до ≥70) в затронутых статьях. Не ломай MDX (никаких вложенных двойных кавычек в JSX-атрибутах). Запусти \`npm run audit:blog\` снова, добейся 0 ERROR. НЕ делай git commit/push.
В конце выведи: SUMMARY: исправлено`;
}

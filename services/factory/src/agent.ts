import { query } from "@anthropic-ai/claude-agent-sdk";
import { repoPaths } from "./repo.js";

const ALLOWED_TOOLS = ["Read", "Edit", "Write", "Bash", "Glob", "Grep", "WebSearch", "WebFetch"];
// Только чтение + веб — для агента-верификатора, который сверяет факты, но НЕ правит файлы.
export const READONLY_TOOLS = ["Read", "Glob", "Grep", "WebSearch", "WebFetch"];

export interface AgentRun {
  text: string; // финальный текст результата (содержит строку SUMMARY: …)
  costUsd: number;
  ok: boolean;
}

/**
 * Запускает одного автономного агента (Opus 4.8) в клоне репозитория.
 * cwd = клон → агент видит .claude/skills/bizreg-blog-article и весь проект.
 * permissionMode bypassPermissions → без интерактивных подтверждений (headless).
 */
export async function runAgent(
  prompt: string,
  maxTurns: number,
  model: string,
  tools: string[] = ALLOWED_TOOLS,
): Promise<AgentRun> {
  let text = "";
  let costUsd = 0;
  let ok = false;

  const iter = query({
    prompt,
    options: {
      model,
      cwd: repoPaths.root,
      permissionMode: "bypassPermissions",
      allowedTools: tools,
      systemPrompt: { type: "preset", preset: "claude_code" },
      maxTurns,
      // stderr процесса Claude Code → в логи завода (для диагностики)
      stderr: (data: string) => console.error("[claude-code]", data),
    },
  });

  for await (const message of iter as AsyncIterable<any>) {
    if (message.type === "result") {
      text = typeof message.result === "string" ? message.result : "";
      costUsd = Number(message.total_cost_usd ?? 0);
      ok = message.subtype === "success";
    }
  }
  return { text, costUsd, ok };
}

/** Вытаскивает строку SUMMARY: … из вывода агента. */
export function parseSummary(text: string): string {
  const m = text.match(/SUMMARY:\s*(.+)\s*$/im);
  return m ? m[1].trim() : "";
}

export interface FactIssue {
  claim: string; // утверждение из статьи
  where: string; // где в статье (slug.locale / раздел)
  problem: string; // что не так
  correct?: string; // верное значение по источнику (если известно)
  source?: string; // Tier-1 URL, подтверждающий/опровергающий
  severity: "blocking" | "advisory";
}
export interface Verdict {
  pass: boolean;
  issues: FactIssue[];
}

/**
 * Вытаскивает финальный вердикт факт-чекера: строка `VERDICT: { ... }` с JSON.
 * Берём последнее вхождение (агент мог рассуждать выше). null — если не распарсилось.
 */
export function parseVerdict(text: string): Verdict | null {
  // Берём последнее «VERDICT:» (агент мог рассуждать выше) и greedy-объект до последней `}`.
  // Greedy устойчив к pretty-printed JSON (вложенные `}` не обрывают разбор), т.к. по
  // промпту VERDICT — последнее в выводе.
  const idx = text.lastIndexOf("VERDICT:");
  if (idx === -1) return null;
  const m = text.slice(idx + 8).match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    return normalizeVerdict(JSON.parse(m[0]));
  } catch {
    return null;
  }
}

function normalizeVerdict(v: any): Verdict {
  const issues: FactIssue[] = Array.isArray(v?.issues)
    ? v.issues.map((i: any) => ({
        claim: String(i?.claim ?? ""),
        where: String(i?.where ?? ""),
        problem: String(i?.problem ?? ""),
        correct: i?.correct ? String(i.correct) : undefined,
        source: i?.source ? String(i.source) : undefined,
        severity: i?.severity === "blocking" ? "blocking" : "advisory",
      }))
    : [];
  const hasBlocking = issues.some((i) => i.severity === "blocking");
  return { pass: v?.pass === true && !hasBlocking, issues };
}

/** Парсит JSON-массив тем из вывода планировщика (терпим к обрамлению). */
export function parseTopics(text: string): { slug: string; title: string; keyword: string }[] {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const arr = candidate.match(/\[[\s\S]*\]/);
  if (!arr) return [];
  try {
    const parsed = JSON.parse(arr[0]);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && t.slug && t.title && t.keyword)
      .map((t) => ({
        slug: String(t.slug).trim(),
        title: String(t.title).trim(),
        keyword: String(t.keyword).trim(),
      }));
  } catch {
    return [];
  }
}

/** Простой ограничитель параллелизма для волн писателей. */
export async function pool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await fn(items[i], i);
    }
  }
  const n = Math.max(1, Math.min(limit, items.length));
  await Promise.all(Array.from({ length: n }, worker));
  return results;
}

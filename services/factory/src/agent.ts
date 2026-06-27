import { query } from "@anthropic-ai/claude-agent-sdk";
import { config } from "./config.js";
import { repoPaths } from "./repo.js";

const ALLOWED_TOOLS = ["Read", "Edit", "Write", "Bash", "Glob", "Grep", "WebSearch", "WebFetch"];

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
export async function runAgent(prompt: string, maxTurns: number): Promise<AgentRun> {
  let text = "";
  let costUsd = 0;
  let ok = false;

  const iter = query({
    prompt,
    options: {
      model: config.model,
      cwd: repoPaths.root,
      permissionMode: "bypassPermissions",
      allowedTools: ALLOWED_TOOLS,
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

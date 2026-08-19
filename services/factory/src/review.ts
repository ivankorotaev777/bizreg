import { config } from "./config.js";
import { runAgent, parseVerdict, READONLY_TOOLS, type FactIssue } from "./agent.js";
import { runAudit } from "./audit.js";
import { factCheckPrompt, factFixPrompt } from "./prompts.js";

export interface ReviewResult {
  ok: boolean;
  cost: number;
  issues: FactIssue[]; // проблемы по последнему вердикту (для уведомления)
  unverified: boolean; // верификатор не вернул машиночитаемый вердикт → не доказали корректность
}

function fmtIssues(issues: FactIssue[]): string {
  return issues
    .map(
      (i, n) =>
        `${n + 1}. [${i.severity}] ${i.where}: «${i.claim}» — ${i.problem}` +
        (i.correct ? ` → верно: ${i.correct}` : "") +
        (i.source ? ` (${i.source})` : ""),
    )
    .join("\n");
}

/**
 * Второй гейт публикации (после audit:blog): независимый факт-чек цифр и норм по Tier-1.
 * Verifier (read-only) выносит VERDICT; при blocking-проблемах — fixer правит, затем повтор,
 * до maxReviewAttempts. Перед выходом перепроверяем audit:blog, чтобы правки фиксера не уронили
 * детерминированный гейт. Возвращает ok=false при найденных ошибках ИЛИ если факты не удалось
 * верифицировать (fail-closed для YMYL).
 */
export async function reviewGate(slugs: string[], fixModel: string): Promise<ReviewResult> {
  let cost = 0;
  let fixed = false;

  let run = await runAgent(factCheckPrompt(slugs), 40, config.reviewModel, READONLY_TOOLS);
  cost += run.costUsd;
  let verdict = parseVerdict(run.text);

  let attempt = 0;
  while (verdict && !verdict.pass && attempt < config.maxReviewAttempts) {
    const blocking = verdict.issues.filter((i) => i.severity === "blocking");
    if (blocking.length === 0) break; // pass=false без blocking — на всякий случай не зацикливаемся

    attempt++;
    console.log(`Факт-чек не пройден (${blocking.length} blocking), попытка исправления ${attempt}…`);
    const fix = await runAgent(factFixPrompt(fmtIssues(blocking)), 40, fixModel);
    cost += fix.costUsd;
    fixed = true;

    run = await runAgent(factCheckPrompt(slugs), 40, config.reviewModel, READONLY_TOOLS);
    cost += run.costUsd;
    verdict = parseVerdict(run.text);
  }

  // Верификатор не дал распарсиваемый вердикт — для YMYL считаем непроверенным (fail-closed).
  if (!verdict) return { ok: false, cost, issues: [], unverified: true };

  // Если фиксер правил файлы — убеждаемся, что детерминированный гейт всё ещё зелёный.
  if (verdict.pass && fixed) {
    const audit = await runAudit();
    if (!audit.ok) {
      return {
        ok: false,
        cost,
        issues: [
          {
            claim: "audit:blog",
            where: slugs.join(", "),
            problem: "после факт-правок сломался детерминированный аудит — нужна ручная правка",
            severity: "blocking",
          },
        ],
        unverified: false,
      };
    }
  }

  return { ok: verdict.pass, cost, issues: verdict.issues, unverified: false };
}

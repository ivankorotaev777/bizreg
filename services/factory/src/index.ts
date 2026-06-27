import { config } from "./config.js";
import {
  claimNextJob,
  markDone,
  markError,
  recordUpdate,
  requeueStaleProcessing,
  type Job,
} from "./db.js";
import {
  ensureRepo,
  hasChanges,
  commitAndPush,
  commitPathsAndPush,
  currentSha,
  discardChanges,
  articleTitle,
  articleUrl,
} from "./repo.js";
import { runAudit } from "./audit.js";
import { runAgent, parseSummary, parseTopics, pool } from "./agent.js";
import { enrichmentPrompt, writePrompt, planPrompt, fixPrompt, type Topic } from "./prompts.js";
import { notifyGroup, notifyUser } from "./notify.js";
import { syncArticles } from "./sync.js";

/**
 * Гейт публикации: прогоняет аудит; если есть ERROR — натравливает агента-исправителя
 * (до maxFixAttempts раз). Возвращает true, если в итоге 0 ERROR.
 */
async function passGate(model: string): Promise<{ ok: boolean; fixCost: number; lastOutput: string }> {
  let fixCost = 0;
  let { ok, output } = await runAudit();
  let attempt = 0;
  while (!ok && attempt < config.maxFixAttempts) {
    attempt++;
    console.log(`Аудит не прошёл, попытка исправления ${attempt}…`);
    const fix = await runAgent(fixPrompt(output), 40, model);
    fixCost += fix.costUsd;
    ({ ok, output } = await runAudit());
  }
  return { ok, fixCost, lastOutput: output };
}

async function processEnrichment(job: Job): Promise<void> {
  const { slug, note, manager_id, manager_name } = job.payload;
  await ensureRepo();

  const run = await runAgent(enrichmentPrompt(slug, note), 40, config.enrichModel);
  let cost = run.costUsd;

  if (!(await hasChanges())) {
    await discardChanges();
    await markError(job.id, "Агент не внёс изменений в статью.");
    await notifyUser(manager_id, `⚠️ Не получилось дополнить «${slug}»: агент не внёс изменений.`);
    return;
  }

  const gate = await passGate(config.enrichModel);
  cost += gate.fixCost;
  if (!gate.ok) {
    await discardChanges();
    await markError(job.id, "Аудит не пройден после исправлений.\n" + gate.lastOutput.slice(-2000));
    await notifyUser(manager_id, `⚠️ Дополнение «${slug}» не прошло аудит. Нужна ручная правка.`);
    return;
  }

  const summary = parseSummary(run.text) || "дополнение от менеджера";
  const sha = await commitAndPush(`docs(blog): обновление ${slug} — ${summary}`);
  await recordUpdate({
    slug,
    managerId: manager_id ?? null,
    managerName: manager_name ?? null,
    summary,
    note: note ?? "",
    commitSha: sha,
  });
  await syncArticles();

  const title = await articleTitle(slug);
  await notifyGroup(
    `📝 <b>Статья обновлена</b>\n${title}\n${articleUrl(slug)}\n\n` +
      `Дополнил: ${manager_name ?? "—"}\nЧто нового: ${summary}`,
  );
  await markDone(job.id, { slug, summary, sha, costUsd: cost });
  console.log(`Enrichment ${slug} готов. Стоимость ≈ $${cost.toFixed(2)}`);
}

async function processGeneration(job: Job): Promise<void> {
  const { count, topics: wishTopics, manager_id, manager_name } = job.payload;
  const n = Math.max(1, Math.min(Number(count) || 1, 100));
  await ensureRepo();

  // 1) План тем
  const plan = await runAgent(
    planPrompt(n, Array.isArray(wishTopics) ? wishTopics : []),
    15,
    config.genModel,
  );
  let cost = plan.costUsd;
  const topics: Topic[] = parseTopics(plan.text).slice(0, n);
  if (topics.length === 0) {
    await markError(job.id, "Планировщик не вернул темы.");
    await notifyUser(manager_id, "⚠️ Не удалось составить план тем для генерации.");
    return;
  }

  // 2) Волны писателей (ограниченный параллелизм)
  const writes = await pool(topics, config.writerConcurrency, async (t) => {
    try {
      const r = await runAgent(writePrompt(t), 60, config.genModel);
      return { topic: t, summary: parseSummary(r.text), cost: r.costUsd, ok: r.ok };
    } catch (e) {
      console.error("writer failed", t.slug, e);
      return { topic: t, summary: "", cost: 0, ok: false };
    }
  });
  cost += writes.reduce((s, w) => s + w.cost, 0);

  if (!(await hasChanges())) {
    await discardChanges();
    await markError(job.id, "Писатели не создали файлов.");
    await notifyUser(manager_id, "⚠️ Генерация не дала результата.");
    return;
  }

  // 3) Гейт по всему репозиторию
  const gate = await passGate(config.genModel);
  cost += gate.fixCost;
  if (!gate.ok) {
    await discardChanges();
    await markError(job.id, "Аудит не пройден после исправлений.\n" + gate.lastOutput.slice(-2000));
    await notifyUser(manager_id, "⚠️ Сгенерированные статьи не прошли аудит. Нужна ручная правка.");
    return;
  }

  // Публикуем по одной статье: маленькие паки обходят HTTP 500 GitHub на
  // больших пушах (на нём раньше падала генерация нескольких статей разом).
  let sha = "";
  for (const w of writes) {
    if (!w.ok) continue;
    const slug = w.topic.slug;
    const pushed = await commitPathsAndPush(
      [`content/blog/${slug}.ru.mdx`, `content/blog/${slug}.en.mdx`],
      `feat(blog): ${slug} (автогенерация)`,
    );
    if (pushed) sha = await currentSha();
  }
  // Остальное (картинки, данные синка и т.п.) — финальным коммитом.
  if (await hasChanges()) {
    sha = await commitAndPush(`chore(blog): ассеты для ${topics.length} статей (автогенерация)`);
  }
  if (!sha) sha = await currentSha();
  await syncArticles();

  const list = writes
    .filter((w) => w.summary)
    .map((w) => `• ${w.summary}`)
    .slice(0, 20)
    .join("\n");
  await notifyGroup(
    `🏭 <b>Опубликовано новых статей: ${topics.length}</b>\nЗаказал: ${manager_name ?? "—"}\n\n${list}`,
  );
  await markDone(job.id, { count: topics.length, sha, costUsd: cost });
  console.log(`Generation готов: ${topics.length} статей. Стоимость ≈ $${cost.toFixed(2)}`);
}

async function processJob(job: Job): Promise<void> {
  console.log(`Беру задание ${job.id} (${job.type})`);
  try {
    if (job.type === "enrichment") await processEnrichment(job);
    else if (job.type === "generation") await processGeneration(job);
    else await markError(job.id, `Неизвестный тип задания: ${job.type}`);
  } catch (e: any) {
    console.error("Job failed", job.id, e);
    try {
      await discardChanges();
    } catch {}
    await markError(job.id, String(e?.message ?? e));
    await notifyUser(job.created_by, `⚠️ Задание ${job.type} завершилось с ошибкой.`);
  }
}

async function main() {
  console.log("Factory: запуск. Подготовка репозитория…");
  await ensureRepo();
  const n = await syncArticles();
  const requeued = await requeueStaleProcessing();
  if (requeued > 0) console.log(`Возвращено в очередь зависших заданий: ${requeued}`);
  console.log(`Готов. В кэше ${n} статей. Опрос очереди каждые ${config.pollIntervalMs} мс.`);

  // Простой цикл-поллер. Один воркер обрабатывает задания последовательно.
  while (true) {
    let job: Job | null = null;
    try {
      job = await claimNextJob();
    } catch (e) {
      console.error("claimNextJob error", e);
    }
    if (job) {
      await processJob(job);
    } else {
      await new Promise((r) => setTimeout(r, config.pollIntervalMs));
    }
  }
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});

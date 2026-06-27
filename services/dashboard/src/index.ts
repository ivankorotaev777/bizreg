import { readFile } from "node:fs/promises";
import { config } from "./config.js";
import { ensureSchema, setTargets, type TargetRow } from "./db.js";
import { syncGsc } from "./gsc.js";
import { createServer } from "./server.js";

async function runSync() {
  try {
    const r = await syncGsc();
    console.log(`GSC sync: ${r.rows} строк, ${r.from} → ${r.to}`);
  } catch (e) {
    console.error("GSC sync error:", e);
  }
}

/** Загружает целевые ключи из CSV (data/target_keywords.csv): include=✓, колонки phrase/intent/cluster/freq_yandex. */
async function loadTargets() {
  try {
    const raw = await readFile(new URL("../data/target_keywords.csv", import.meta.url), "utf8");
    const rows: TargetRow[] = raw
      .split(/\r?\n/)
      .slice(1)
      .filter(Boolean)
      .map((l) => l.split(","))
      .filter((c) => c[0]?.trim() === "✓")
      .map((c) => ({
        keyword: (c[1] || "").trim(),
        intent: (c[5] || "").trim(),
        cluster: (c[6] || "").trim(),
        freq: parseInt(c[7] || "0", 10) || 0,
      }))
      .filter((r) => r.keyword);
    await setTargets(rows);
    console.log(`Целевые ключи загружены: ${rows.length}`);
  } catch (e) {
    console.error("loadTargets error:", e);
  }
}

async function main() {
  await ensureSchema();
  await loadTargets();
  createServer().listen(config.port, () => {
    console.log(`SEO-дашборд слушает порт ${config.port}`);
  });
  // первичная синхронизация + периодическая
  runSync();
  setInterval(runSync, config.syncIntervalHours * 60 * 60 * 1000);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});

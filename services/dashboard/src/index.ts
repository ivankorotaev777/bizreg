import { config } from "./config.js";
import { ensureSchema } from "./db.js";
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

async function main() {
  await ensureSchema();
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

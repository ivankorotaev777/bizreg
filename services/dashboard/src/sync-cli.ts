// Разовая синхронизация GSC: `npm run sync`.
import { ensureSchema } from "./db.js";
import { syncGsc } from "./gsc.js";

(async () => {
  await ensureSchema();
  const r = await syncGsc();
  console.log(`GSC sync: ${r.rows} строк, ${r.from} → ${r.to}`);
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

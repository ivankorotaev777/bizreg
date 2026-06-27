// Разовая синхронизация списка статей: `npm run sync`.
// Полезно при первом запуске, чтобы в боте сразу появился список статей.
import { ensureRepo } from "./repo.js";
import { syncArticles } from "./sync.js";

(async () => {
  await ensureRepo();
  const n = await syncArticles();
  console.log(`Синхронизировано статей: ${n}`);
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

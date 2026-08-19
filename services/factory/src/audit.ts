import { exec } from "node:child_process";
import { repoPaths } from "./repo.js";

/**
 * Прогоняет тот же гейт, что и pre-push хук: `npm run audit:blog`.
 * exit 0 — 0 ERROR и SEO-score ≥85 (публикуем). exit 1 — есть ошибки.
 */
export function runAudit(): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolve) => {
    exec(
      "npm run audit:blog --silent",
      { cwd: repoPaths.root, maxBuffer: 32 * 1024 * 1024 },
      (err, stdout, stderr) => {
        const output = (stdout + "\n" + stderr).trim();
        resolve({ ok: !err, output });
      },
    );
  });
}

import { exec } from "node:child_process";
import { promisify } from "node:util";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { config } from "./config.js";

const sh = promisify(exec);
const REPO = path.resolve(config.workdir);
const BLOG_DIR = path.join(REPO, "content", "blog");

// Никогда не печатаем токен в логах/ошибках.
function redact(s: unknown): string {
  return String(s ?? "").split(config.githubToken).join("***");
}

async function git(args: string, cwd = REPO) {
  try {
    return await sh(`git ${args}`, { cwd, maxBuffer: 64 * 1024 * 1024 });
  } catch (e: any) {
    throw new Error(redact(e?.stderr || e?.message || e));
  }
}

/** Клонирует репозиторий (если нужно), сбрасывает к свежему origin/<branch>, ставит deps. */
export async function ensureRepo(): Promise<void> {
  if (!existsSync(path.join(REPO, ".git"))) {
    console.log("Клонирую репозиторий…");
    try {
      await sh(`git clone --branch ${config.gitBranch} ${config.repoUrl} ${REPO}`, {
        maxBuffer: 64 * 1024 * 1024,
      });
    } catch (e: any) {
      throw new Error(redact(e?.stderr || e?.message || e));
    }
  } else {
    await git("fetch origin");
  }
  await git(`checkout ${config.gitBranch}`);
  await git(`reset --hard origin/${config.gitBranch}`);
  await git("clean -fd"); // убрать незакоммиченные файлы прошлых прогонов (node_modules сохраняется — он в .gitignore)
  await git(`config user.name "${config.gitAuthorName}"`);
  await git(`config user.email "${config.gitAuthorEmail}"`);
  // Устойчивость push к "RPC failed; HTTP 500 / the remote end hung up"
  // (большие паки с картинками + капризы HTTP/2 на стороне GitHub).
  await git("config http.postBuffer 524288000");
  await git("config http.version HTTP/1.1");

  if (!existsSync(path.join(REPO, "node_modules"))) {
    console.log("Устанавливаю зависимости репозитория (npm ci)… это разово.");
    await sh("npm ci", { cwd: REPO, maxBuffer: 256 * 1024 * 1024, timeout: 15 * 60_000 });
  }
}

export async function currentSha(): Promise<string> {
  const { stdout } = await git("rev-parse HEAD");
  return stdout.trim();
}

/** Есть ли незакоммиченные изменения. */
export async function hasChanges(): Promise<boolean> {
  const { stdout } = await git("status --porcelain");
  return stdout.trim().length > 0;
}

/** push с ретраями: GitHub иногда отдаёт HTTP 500/обрыв на больших паках. */
async function pushWithRetry(): Promise<void> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      await git(`push origin ${config.gitBranch}`);
      return;
    } catch (e) {
      lastErr = e;
      console.error(`push: попытка ${attempt}/4 не удалась, повтор…`);
      await new Promise((r) => setTimeout(r, attempt * 3000));
    }
  }
  throw lastErr;
}

/** Есть ли застейдженные (в индексе) изменения. */
async function hasStaged(): Promise<boolean> {
  try {
    await git("diff --cached --quiet");
    return false;
  } catch {
    return true; // ненулевой код = есть изменения в индексе
  }
}

/** Коммитит и пушит все изменения одним коммитом. Возвращает sha. */
export async function commitAndPush(message: string): Promise<string> {
  await git("add -A");
  // -q + экранирование сообщения, чтобы не ломать кавычками
  const safe = message.replace(/"/g, "'");
  await git(`commit -q -m "${safe}"`);
  await pushWithRetry();
  return currentSha();
}

/**
 * Коммитит и пушит ТОЛЬКО указанные пути отдельным маленьким коммитом.
 * GitHub отдаёт HTTP 500 на больших паках (несколько статей разом), поэтому
 * генерация публикует статьи по одной — каждый pack мелкий, как у enrichment.
 * Несуществующие пути молча пропускаются. Возвращает true, если что-то ушло.
 */
export async function commitPathsAndPush(paths: string[], message: string): Promise<boolean> {
  for (const p of paths) {
    if (existsSync(path.join(REPO, p))) await git(`add -- "${p}"`);
  }
  if (!(await hasStaged())) return false;
  const safe = message.replace(/"/g, "'");
  await git(`commit -q -m "${safe}"`);
  await pushWithRetry();
  return true;
}

/** Откатывает незакоммиченные изменения (после неудачного гейта). */
export async function discardChanges(): Promise<void> {
  await git("reset --hard");
  await git("clean -fd");
}

export const repoPaths = { root: REPO, blogDir: BLOG_DIR };

interface ArticleFile {
  slug: string;
  title: string;
  datePublished: string | null;
  dateModified: string | null;
}

/** Сканирует content/blog/*.ru.mdx и возвращает мету (для синхронизации списка). */
export async function listArticleMeta(): Promise<ArticleFile[]> {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".ru.mdx"));
  const out: ArticleFile[] = [];
  for (const f of files) {
    const slug = f.replace(/\.ru\.mdx$/, "");
    const raw = await readFile(path.join(BLOG_DIR, f), "utf8");
    const { data } = matter(raw);
    out.push({
      slug,
      title: (data.title as string) ?? slug,
      datePublished: (data.datePublished as string) ?? null,
      dateModified: (data.dateModified as string) ?? null,
    });
  }
  return out;
}

/** Заголовок (ru) одной статьи по slug — для уведомлений. */
export async function articleTitle(slug: string): Promise<string> {
  try {
    const raw = await readFile(path.join(BLOG_DIR, `${slug}.ru.mdx`), "utf8");
    return (matter(raw).data.title as string) ?? slug;
  } catch {
    return slug;
  }
}

export function articleUrl(slug: string): string {
  return `${config.siteUrl}/blog/${slug}`;
}

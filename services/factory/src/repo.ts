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

/** Коммитит и пушит. Возвращает sha коммита. */
export async function commitAndPush(message: string): Promise<string> {
  await git("add -A");
  // -q + экранирование сообщения через файл, чтобы не ломать кавычками
  const safe = message.replace(/"/g, "'");
  await git(`commit -q -m "${safe}"`);
  await git(`push origin ${config.gitBranch}`);
  return currentSha();
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

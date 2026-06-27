# BizReg — контент-конвейер (бот + завод)

Два независимых сервиса на Railway, общая база — **Railway Postgres**.

```
Менеджер (Telegram)
   │  голосовое «что добавить»
   ▼
┌─────────────┐   job в очередь    ┌──────────────────────────────┐
│  seo-bot    │ ─────────────────▶ │  factory (Claude Agent SDK,   │
│ (grammY +   │   Postgres         │  Opus 4.8)                    │
│  Whisper)   │ ◀───── список ──── │  clone → агент → аудит → push │
└─────────────┘   статей/история   └──────────────┬───────────────┘
                                                   │ git push main
                                                   ▼
                                          GitHub → Vercel (деплой)
                                                   │
                                          уведомление в общую группу
```

- **seo-bot** — тонкий интерфейс. Принимает голос → расшифровывает (Whisper) → кладёт задание в очередь. Сам ИИ-работу не делает. Показывает список статей с историей обновлений.
- **factory** — автономный завод на Claude Agent SDK (Opus 4.8). Берёт задания из очереди, клонирует репозиторий bizreg, агент пишет/дополняет статьи **по скиллу `bizreg-blog-article`**, прогоняет тот же аудит-гейт, что и pre-push хук (0 ERROR, SEO ≥70), коммитит и пушит в `main` (Vercel деплоит), пишет историю и уведомляет общую группу.

Общая БД (очередь заданий + история + аллоулист + кэш статей) — обычный Postgres. Используем **Railway Postgres**, чтобы не плодить вендоров; код ходит в неё через `pg` по строке `DATABASE_URL`.

---

## 0. Что нужно подготовить (твои действия — я не ввожу креды сам)

| Что | Где взять |
|---|---|
| **Telegram bot token** | @BotFather. ⚠️ Токен, что светился в чате, **перевыпусти**. |
| **ID общей группы** | Добавь бота в группу, отправь сообщение, открой `https://api.telegram.org/bot<TOKEN>/getUpdates` → `chat.id` (отрицательное число). |
| **Свой Telegram ID** (владелец) | Напиши @userinfobot. |
| **Anthropic API key** | console.anthropic.com → API keys. |
| **OpenAI API key** | platform.openai.com → API keys (только для расшифровки голосовых, ~$0.006/мин). |
| **GitHub token** | GitHub → Settings → Developer settings → Fine-grained PAT с доступом `Contents: Read and write` к репозиторию bizreg. |

> Postgres отдельно «доставать» не нужно — это сервис внутри Railway (см. ниже).
> Транскрипция — единственная не-Anthropic зависимость (Claude не умеет STT). По умолчанию OpenAI Whisper; модуль `seo-bot/src/transcribe.ts` изолирован, легко заменить на Yandex SpeechKit.

---

## 1. Railway Postgres — по шагам

1. Railway → открой (или создай) проект для конвейера.
2. **New → Database → Add PostgreSQL.** Появится сервис «Postgres» — Railway сам создаёт базу и переменные (`DATABASE_URL`, `DATABASE_PUBLIC_URL` и др.). Ничего настраивать не надо.
3. **Создай таблицы.** Два способа:
   - **Через psql локально** (нужен установленный `psql`):
     1. В сервисе Postgres → вкладка **Variables** → скопируй `DATABASE_PUBLIC_URL` (публичный, с SSL).
     2. Выполни:
        ```bash
        psql "<DATABASE_PUBLIC_URL>" -f services/db/schema.sql
        ```
   - **Через UI Railway**: сервис Postgres → вкладка **Data** (Query) → вставь содержимое `services/db/schema.sql` → Run.
4. **Добавь себя владельцем** (свой Telegram ID) — там же в Query или через psql:
   ```sql
   insert into managers (telegram_id, name, role) values (123456789, 'Иван', 'owner');
   ```
5. Менеджеров добавляй так же с `role = 'manager'`.

> Внутри Railway сервисы общаются по приватной сети (`*.railway.internal`, без SSL, без платы за трафик). Для локального запуска с ноутбука бери `DATABASE_PUBLIC_URL` — код сам включит SSL по хосту.

---

## 2. Деплой seo-bot на Railway

1. В том же проекте → **New → GitHub Repo** → выбери репозиторий bizreg.
2. Сервис → **Settings → Root Directory = `services/seo-bot`**.
3. **Variables:**
   - `DATABASE_URL` → **Add Reference → Postgres → `DATABASE_URL`** (Railway подставит приватный URL автоматически).
   - `BOT_TOKEN`, `OPENAI_API_KEY`, `SITE_URL` — из `services/seo-bot/.env.example`.
4. Railway сам выполнит `npm install` и `npm start` (Node 20+).

## 3. Деплой factory на Railway

1. В том же проекте → **New → GitHub Repo** → тот же репозиторий.
2. Сервис → **Settings → Root Directory = `services/factory`**.
3. **Variables** (см. `services/factory/.env.example`):
   - `DATABASE_URL` → **Add Reference → Postgres → `DATABASE_URL`**.
   - `ANTHROPIC_API_KEY`, `MODEL=claude-opus-4-8`, `GITHUB_TOKEN`, `GITHUB_REPO=<owner>/bizreg`, `BOT_TOKEN`, `TELEGRAM_GROUP_ID`, `SITE_URL`.
4. Первый запуск: завод склонирует репо, выполнит `npm ci` (разово, несколько минут) и синхронизирует список статей в таблицу `articles` → в боте появится список.
   - Можно прогнать вручную локально (с публичным URL базы): `cd services/factory && npm i && DATABASE_URL="<DATABASE_PUBLIC_URL>" npm run sync`.

---

## 4. Как это работает для пользователя

**Менеджер дополняет статью:**
1. `/start` → «✍️ Дополнить статью».
2. Выбирает статью (бейдж: 🟢 дата последнего обновления / ⚪️ «нет обновл.»).
3. Видит полную историю обновлений статьи.
4. «🎙 Записать дополнение» → голосовое → бот расшифровывает → показывает текст → «✅ Отправить в работу».
5. Завод дорабатывает статью по стандарту, проверяет факты, публикует, ставит на сайте «↻ Обновлено: DATE» и пишет в общую группу.

**Владелец заказывает статьи:**
- `/start` → «🏭 Заказать новые статьи» → 10/25/50, либо команда `/generate 50`.
- Завод сам придумывает темы (без дублей), пишет волнами параллельных агентов, проверяет, публикует, уведомляет группу.

---

## 5. Стоимость (Opus 4.8)

- Дополнение статьи: ≈ $0.1–0.5.
- Новая статья «с нуля»: ≈ $1–3.
- Пакет «+50 статей»: ≈ $50–150.
- Whisper-расшифровка: центы.

Управляется `MODEL` (можно временно понизить до `claude-sonnet-4-6` для экономии), `WRITER_CONCURRENCY`, `MAX_FIX_ATTEMPTS`.

---

## 6. Гарантии качества

- Завод гоняет **тот же** `npm run audit:blog`, что и pre-push хук: 0 ERROR + SEO-score ≥70, иначе агент-исправитель (до `MAX_FIX_ATTEMPTS` раз), иначе изменения откатываются и заказчику приходит предупреждение — **в `main` ничего сломанного не попадёт**.
- Агент работает в клоне репо, видит `.claude/skills/bizreg-blog-article` и весь проект; промпт явно требует читать `SKILL.md`, соблюдать фактические инварианты (§11) и Tier-1 источники.
- Одобрение владельцем не требуется (по твоему ТЗ) — гейтом выступает аудит.


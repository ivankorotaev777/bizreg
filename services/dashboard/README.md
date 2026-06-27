# BizReg — SEO-дашборд (Фаза 1: Google)

Отдельный сервис: раз в N часов тянет статистику из **Google Search Console** в наш Postgres и отдаёт защищённую паролем страницу — трафик, позиции и запросы **по каждой статье**, с разбивкой по странам и динамикой.

Таблицы создаются автоматически при старте (отдельный SQL запускать не нужно).

---

## 1. Доступ к Google Search Console API (твоя часть, ~15–20 мин)

1. Открой **console.cloud.google.com** → создай проект (например `bizreg-seo`).
2. **APIs & Services → Library** → найди **Google Search Console API** → **Enable**.
3. **APIs & Services → Credentials → Create credentials → Service account**:
   - имя `bizreg-gsc` → Create → роли не нужны → Done.
4. Открой созданный сервисный аккаунт → вкладка **Keys → Add key → Create new key → JSON** → скачается файл `*.json`. Это секрет.
5. Скопируй **email сервисного аккаунта** (вида `bizreg-gsc@bizreg-seo.iam.gserviceaccount.com`).
6. Открой **Search Console** (search.google.com/search-console) для bizreg.uz → **Settings → Users and permissions → Add user** → вставь этот email → права **Full** (или Restricted) → Add.

Всё. Содержимое JSON-файла целиком пойдёт в переменную `GSC_CREDENTIALS` на Railway (в чат не шли).

---

## 2. Деплой на Railway

1. В проекте → **New → GitHub Repo → `ivankorotaev777/bizreg`**.
2. Сервис → **Settings → Root Directory** = `services/dashboard`.
3. **Settings → Networking → Generate Domain** (чтобы получить публичный URL дашборда).
4. **Variables**:
   - `DATABASE_URL` → **Add Reference → Postgres → DATABASE_URL**
   - `GSC_CREDENTIALS` → вставь **весь JSON** сервисного аккаунта одной переменной (как есть, с переносами — Railway это принимает)
   - `GSC_SITE_URL` = `sc-domain:bizreg.uz`
   - `DASHBOARD_PASSWORD` = придумай пароль
   - (необяз.) `GSC_BACKFILL_DAYS=180`, `SYNC_INTERVAL_HOURS=12`
5. Deploy. В логах: `SEO-дашборд слушает порт …` и `GSC sync: N строк …`.

---

## 3. Использование

- Открой выданный Railway-домен → браузер спросит логин/пароль: **логин любой**, пароль — `DASHBOARD_PASSWORD`.
- KPI (клики/показы/средняя позиция), график динамики, таблица статей. **Клик по статье** → её запросы и география.
- Период переключается вверху (28/90/180 дней).
- Принудительная синхронизация: `POST /api/sync` (или просто подожди — идёт по расписанию).

Замечания:
- GSC отдаёт данные с задержкой ~2 дня и только по **Google**. Сайт новый — статистика будет наполняться неделями.
- Яндекс (позиции/трафик) и конкуренты — Фазы 2 и 3, добавим отдельно.

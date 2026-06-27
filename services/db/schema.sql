-- BizReg content pipeline — схема Postgres (Railway Postgres / любой Postgres 13+)
-- Выполни один раз: подключись к базе и прогони этот файл (psql ... -f schema.sql
-- или вставь в любой SQL-клиент). Оба сервиса (seo-bot и factory) работают через эти таблицы.

-- 1) Аллоулист менеджеров. Только они могут пользоваться ботом.
--    role: 'owner' (может заказывать генерацию N статей) | 'manager' (только дополнения)
create table if not exists managers (
  telegram_id  bigint primary key,
  name         text not null,
  role         text not null default 'manager' check (role in ('owner', 'manager')),
  added_at     timestamptz not null default now()
);

-- 2) Очередь заданий для завода.
--    type='enrichment' payload: { slug, note, manager_id, manager_name }
--    type='generation' payload: { count, topics?: string[], manager_id, manager_name }
create table if not exists jobs (
  id           uuid primary key default gen_random_uuid(),
  type         text not null check (type in ('enrichment', 'generation')),
  status       text not null default 'queued'
                 check (status in ('queued', 'processing', 'done', 'error')),
  payload      jsonb not null default '{}'::jsonb,
  result       jsonb,
  error        text,
  attempts     int  not null default 0,
  created_by   bigint,
  created_at   timestamptz not null default now(),
  started_at   timestamptz,
  finished_at  timestamptz
);

create index if not exists jobs_status_created_idx on jobs (status, created_at);

-- 3) История обновлений статей (показывается в боте).
create table if not exists article_updates (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null,
  manager_id    bigint,
  manager_name  text,
  summary       text,                 -- краткое описание, что добавили (генерит завод)
  note          text,                 -- исходная расшифровка голосового
  commit_sha    text,
  created_at    timestamptz not null default now()
);

create index if not exists article_updates_slug_idx on article_updates (slug, created_at desc);

-- 4) Кэш списка статей для пикера в боте (синхронизируется заводом из репозитория).
create table if not exists articles (
  slug            text primary key,
  title_ru        text not null,
  date_published  date,
  date_modified   date,
  synced_at       timestamptz not null default now()
);

-- 5) Черновик правок: бот копит несколько правок по статье, отправляет одним
--    заданием по команде /end (тогда же уходит уведомление в группу).
create table if not exists pending_edits (
  id          uuid primary key default gen_random_uuid(),
  manager_id  bigint not null,
  slug        text not null,
  note        text not null,
  created_at  timestamptz not null default now()
);

create index if not exists pending_edits_mgr_slug_idx on pending_edits (manager_id, slug, created_at);

-- Удобное представление: статья + дата последнего обновления из истории.
create or replace view articles_with_updates as
select
  a.slug,
  a.title_ru,
  a.date_published,
  a.date_modified,
  (select max(au.created_at)    from article_updates au where au.slug = a.slug) as last_update,
  (select count(*)::int         from article_updates au where au.slug = a.slug) as update_count
from articles a
order by a.title_ru;

-- Захват задания из очереди делается в коде воркера (factory/src/db.ts) транзакцией
-- с FOR UPDATE SKIP LOCKED — отдельная SQL-функция не нужна.

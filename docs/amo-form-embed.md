# Встраивание AmoCRM (amoforms.js) в Next.js + смена языка сайта

Референс реализации в проекте BizReg: главная страница, компонент `components/AmoFormEmbed.tsx`.

---

## 1. Задача

Встроить веб-форму AmoCRM на страницу Next.js (App Router) так, чтобы:

- форма **стабильно появлялась** после клиентской навигации и смены языка;
- не было пустого блока из‑за `next/script`, reconciliation в React и «залипших» глобальных объектов Amo.

---

## 2. Что не делаем (типичные ошибки)

| Подход | Проблема |
|--------|----------|
| `next/script` с `strategy="afterInteractive"` | Скрипты уезжают из DOM-контейнера формы → блок остаётся пустым |
| Статичные `<script>` в JSX без cleanup | При SPA/смене locale остаются дубликаты `#amoforms_script_*`, инициализация ломается |
| Обёртка с `overflow: hidden` + фиксированная `min-height` на iframe | Форма обрезается, на мобиле не видна |
| Ожидать, что `locale` сайта автоматически меняет язык Amo | В embed в коде зашито `locale: "ru"`; язык полей — из настроек формы в Amo |

---

## 3. Архитектура в репозитории

```
app/[locale]/page.tsx          → секция #request-form → <AmoFormEmbed />
components/AmoFormEmbed.tsx    → вставка скриптов и cleanup
app/globals.css                → центрирование iframe
components/Header.tsx            → router.replace(pathname, { locale }) — смена языка
```

Переключение языка: **next-intl**, меняется сегмент маршрута `[locale]` в URL.

---

## 4. Компонент `AmoFormEmbed`

**Файл:** `components/AmoFormEmbed.tsx`  
**Директива:** `"use client"`

### 4.1. Пропсы

```ts
type AmoFormEmbedProps = {
  className?: string;
  formId?: string;           // id из кабинета Amo
  formHash?: string;         // hash из embed-кода
  amoScriptVersion?: string; // число после amoforms.js?1778864018
};
```

На главной: `<AmoFormEmbed />` без пропсов — используются дефолты:

| Параметр | Значение по умолчанию |
|----------|------------------------|
| `formId` | `1709718` |
| `formHash` | `20293788a180fcf9d29b726dcd055be9` |
| `amoScriptVersion` | `1778664682` |

### 4.2. Вставка скриптов (не `next/script`)

В **`useLayoutEffect`**:

1. **`resetAmoWindowState()`** — удалить с `window`:
   - `amo_forms_params`
   - `amo_forms_load`
   - `amo_forms_loaded`

2. **`removeStaleAmoDomForKnownForms()`** — удалить из `document` для каждого id из `AMO_FORM_IDS`:
   - `#amoforms_script_{id}`
   - `#amoforms_iframe_{id}`
   - `#amoforms_overlay_{id}`
   - `#amoforms_action_btn`

3. **`clearAmoHost(root)`** — очистить host-контейнер.

4. **`appendChild`** в контейнер:
   - inline `<script>` с init (IIFE из кабинета Amo);
   - `<script id="amoforms_script_{formId}" src="https://forms.amocrm.ru/forms/assets/js/amoforms.js?{version}" async>`.

5. **Cleanup** при unmount: очистить host, убрать `#amoforms_overlay_{formId}`.

**Зависимости effect:** `[formId, formHash, amoScriptVersion]` — **`locale` сайта не входит.**

### 4.3. Init-скрипт

`buildInitScript(formId, formHash)` генерирует тот же IIFE, что в кабинете Amo, с `locale: "ru"`.

### 4.4. `memo` + `propsEqual`

`memo(AmoFormEmbedInner, propsEqual)` — при лишних re-render родителя React не трогает DOM с iframe.

Повторная вставка скриптов при unmount/mount страницы (в т.ч. смена `[locale]`) или при смене `formId` / `formHash` / `amoScriptVersion`.

### 4.5. Разметка host-контейнера

```tsx
<div
  ref={containerRef}
  data-bizreg-amo-host
  className="amo-form-host w-full flex flex-col items-center"
/>
```

Скрипты и iframe Amo — **внутри этого `div`**, не через `next/script` в `<head>`.

---

## 5. Смена языка сайта

1. `Header` → `router.replace(pathname, { locale: newLocale })`.
2. Меняется URL (`/en` ↔ `/ru` и т.д.) → Next.js размонтирует `app/[locale]/...`.
3. `AmoFormEmbed` → unmount → cleanup → mount → снова сброс глобалов и вставка скриптов.

Заголовок секции меняется через **next-intl** (`useTranslations("requestForm")`).

**Если в другом проекте язык меняется без смены URL** — добавить:

```tsx
const locale = useLocale();
<AmoFormEmbed key={locale} />
```

---

## 6. Секция на главной

**Файл:** `app/[locale]/page.tsx`, `RequestFormSection`:

```tsx
<section id="request-form" className="... scroll-mt-28">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto">
      <h2>{t("title")}</h2>
      <AmoFormEmbed />
    </div>
  </div>
</section>
```

Карточку с `border`, `overflow-hidden`, `min-h-[512px]` вокруг формы **не используем** — она мешала отображению.

---

## 7. CSS: центрирование iframe

**Файл:** `app/globals.css`

```css
.amo-form-host,
[data-bizreg-amo-host] {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.amo-form-host iframe[id^="amoforms_iframe_"],
[data-bizreg-amo-host] iframe[id^="amoforms_iframe_"] {
  display: block;
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 100%;
}
```

---

## 8. Thank you / редирект

В коде сайта **нет** редиректа на `/thank_you` после submit.

Редирект настраивается **в кабинете Amo** (`has_redirect`, `redirect_url`).  
Страница `app/[locale]/thank_you/page.tsx` — отдельная статическая страница.

---

## 9. Embed-код из Amo (исходник)

```html
<script>!function(...){ ... amo_forms_load({id:"...",hash:"...",locale:"ru"}) ... }(window,0,"amo_forms_","params","load","loaded");</script>
<script id="amoforms_script_XXXXX" async charset="utf-8" src="https://forms.amocrm.ru/forms/assets/js/amoforms.js?VERSION"></script>
```

В React оба тега создаются в `useLayoutEffect` и вставляются в host-`div`.

---

## 10. Чеклист для переноса в другой проект

- [ ] Клиентский `AmoFormEmbed`: inject в `useLayoutEffect`, не `next/script`
- [ ] Перед mount: сброс `window.amo_forms_*` + удаление старых script/iframe/overlay
- [ ] Cleanup на unmount host-контейнера
- [ ] Уникальный `id` loader: `amoforms_script_{formId}`
- [ ] При смене языка без смены URL — `key={locale}` на embed
- [ ] Без обёртки `overflow: hidden` + жёсткой высоты без необходимости
- [ ] В Amo: разрешённые домены prod/staging
- [ ] Константа `AMO_FORM_IDS` со всеми id форм на сайте для очистки DOM

---

## 11. Диагностика

| Симптом | Вероятная причина |
|---------|-------------------|
| Пустой блок после смены locale | Нет remount + залипшие `amo_forms_*` на `window` |
| Работает только после F5 | SPA без cleanup старых `#amoforms_script_*` |
| Локально ок, прод пусто | Домен не в whitelist Amo / блокировщик |
| Заголовок меняется, формы нет | Нужен `key={locale}` на `AmoFormEmbed` |

---

## 12. Псевдокод

```text
on mount (useLayoutEffect):
  delete window.amo_forms_params, amo_forms_load, amo_forms_loaded
  for each known formId in AMO_FORM_IDS:
    remove #amoforms_script_{id}, #amoforms_iframe_{id}, #amoforms_overlay_{id}
  remove #amoforms_action_btn
  clear host div
  append init script (id, hash, locale from Amo snippet)
  append loader script → amoforms.js?version

on unmount:
  clear host div
  remove #amoforms_overlay_{formId}
```

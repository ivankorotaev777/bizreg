---
name: site-video
description: >
  Добавление видео на сайт bizreg.uz — фаундер-видео в блок партнёров
  (PartnersSection) и видео-отзывы клиентов (TestimonialsSection).
  Use when the user asks to add a founder video, video testimonial,
  «добавь видео фаундера», «видео-отзыв клиента», «положи видео на сайт»,
  or drops a new video file for the site. Enforces the proven pipeline:
  HDR→SDR conversion, crop by subject, ≤4 MB mp4, poster from the same
  stream (no washed-out first frame), GifVideo component, i18n на 5 языках,
  sources kept out of git, cache-busting, визуальная проверка в браузере.
---

# Видео на сайте bizreg.uz (фаундеры и отзывы)

Все видео на сайте работают в едином стиле: **крутятся как гифка**
(autoplay + muted + loop + playsInline), **клик включает звук с начала**,
повторный клик выключает. За это отвечает общий компонент
`components/GifVideo.tsx` — НЕ дублируй его логику, переиспользуй.

## Куда какое видео

- **Фаундер** → `components/PartnersSection.tsx`, ассеты в `public/founders/`.
  Формат кадра 3:4 (720×960). Десктоп: прямоугольник на всю карточку
  (`md:aspect-[3/4]`). Мобилка: кружок 80×80 (общий wrapper, CSS-морфинг).
- **Видео-отзыв клиента** → `components/TestimonialsSection.tsx`, ассеты в
  `public/testimonials/`. Формат кадра 4:5 (720×900). Десктоп: прямоугольник
  сверху карточки (`hidden md:block aspect-[4/5]`). Мобилка: кружок 80×80
  рядом с именем (`md:hidden`, отдельный экземпляр GifVideo — браузер сам
  ставит скрытый на паузу, это ок).
- В обоих компонентах записи — массив объектов; видео включается добавлением
  полей `video` и `poster` к записи. Остальные записи с фото не трогать.

## КРИТИЧНО: один <video> на отзыв/карточку в DOM

Никогда не рендери два `<video>` с одним src (видимый + скрытый через
`hidden`/`md:hidden`) — iOS Safari из-за скрытого дубликата не запускает
автоплей у видимого (ловили вживую: кружок Сержа стоял на телефоне).
Если видео живёт в разных местах вёрстки на мобилке и десктопе:
- определяй ширину через `matchMedia("(max-width: 767px)")` в useEffect
  (state `isMobile: boolean | null`, слушатель на change);
- в «не своём» слоте и до монтирования (`isMobile === null`) рендери
  статичный `<img src={poster}>` — постер совпадает с первым кадром,
  подмены не видно, гидрация не ломается;
- `<GifVideo>` рендерится только в слоте своего размера экрана.
В `GifVideo` уже есть страховка: на монтировании ставится `muted`
(React не выписывает этот атрибут в SSR-разметку) и вызывается
`video.play().catch(...)` — не удаляй её.

## Пайплайн обработки видео (ffmpeg)

1. **Сначала посмотри исходник**: `ffprobe -show_entries stream=width,height,codec_name,color_space,color_transfer,color_primaries`
   и вытащи 1–2 кадра (`ffmpeg -ss 5 -frames:v 1`) — ГЛАЗАМИ проверь, где
   человек в кадре, чтобы подобрать crop по нему, а не вслепую по центру.

2. **HDR обязательно переводить в SDR.** Видео с iPhone часто в HDR
   (`color_space=bt2020nc`, `color_transfer=arib-std-b67`). Если оставить
   как есть — постер будет выцветшим и при старте видео цвет «оживает»
   (баг, который уже ловили). Признак HDR → добавь в -vf:
   `colorspace=iall=bt2020:itrc=bt2020-10:all=bt709:format=yuv420p`
   и выходные флаги `-colorspace bt709 -color_primaries bt709 -color_trc bt709`.
   Если исходник уже bt709 — конвертация не нужна.

3. **Эталонная команда** (подставь crop под положение человека):
   ```bash
   ffmpeg -y -i SRC.MOV \
     -vf "crop=W:H:X:Y,scale=720:960,fps=30,colorspace=iall=bt2020:itrc=bt2020-10:all=bt709:format=yuv420p" \
     -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p \
     -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
     -c:a aac -b:a 96k -movflags +faststart \
     public/<founders|testimonials>/<name>.mp4
   ```
   Цель ≤ 4 МБ. Звук ОСТАВЛЯТЬ (aac 96k) — он включается по клику.
   После конвертации вытащи кадр и проверь глазами кадрирование.

4. **Постер — ТОЛЬКО из уже готового mp4**, никогда из исходника:
   ```bash
   ffmpeg -y -ss 0.2 -i public/.../<name>.mp4 -frames:v 1 -q:v 6 public/.../<name>-poster.jpg
   ```
   Тогда постер и первый кадр совпадают попиксельно (проверка при
   сомнении: filter_complex psnr, норма ≥ ~35 дБ). Постер 50–80 КБ.

## Код и переводы

- В записи компонента: `video: "/<dir>/<name>.mp4"`, `poster: "/<dir>/<name>-poster.jpg"`.
- **При замене существующего файла** тем же именем — обнови cache-bust
  суффикс `?v=N` в ссылках, иначе браузеры покажут старую версию из кэша.
- Надписи кнопки звука (`videoSoundOn` / `videoSoundOff`) и, для отзывов,
  `readMore` / `readLess` должны быть в соответствующем namespace во **всех
  ПЯТИ** файлах локалей: `messages/{ru,en,uz,kk,zh}.json` — про `zh.json`
  постоянно забывают, сборка тогда сыплет MISSING_MESSAGE.
- Текст отзыва (`quoteN`) — тоже на 5 языках.

## Гигиена исходников

- Исходники (тяжёлые .MOV/.MP4, .docx) НИКОГДА не класть в `public/` —
  всё из `public/` уезжает на хостинг. Складывать в корневые `Founders /`
  или `Testimonials/` — обе в `.gitignore`.
- ВАЖНО: шаблоны в `.gitignore` для таких папок привязывать к корню со
  слэшем (`/Testimonials/`): Mac не различает регистр, и голый
  `Testimonials/` спрячет от git и боевую `public/testimonials/` —
  уже наступали на эти грабли.

## Проверка перед «готово»

1. `npx tsc --noEmit` — чисто.
2. `npm run build` — без ошибок и без MISSING_MESSAGE (dev-сервер на время
   сборки остановить — они делят `.next` и сборка может упасть с
   «Cannot find module ./chunks/...»).
3. Скриншоты через playwright-core + системный Chrome (headless) на ширинах
   1280 и 390: видео реально играет (`paused=false, muted=true`), клик
   включает звук и перематывает на 0, повторный — выключает.
4. Помни: блок партнёров показывается на главной И на лендингах
   `/registratsiya-ooo`, `/yuridicheskiy-adres` — изменения видны везде.
5. Коммитить и пушить только после явного «опубликуй» от Ивана; перед push
   — `git pull --rebase` (SEO-фабрика параллельно пушит в main).

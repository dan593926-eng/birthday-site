# 💌 Персональный сайт-поздравление

Атмосферный интерактивный сайт-история на React + TypeScript + Vite + Tailwind + Framer Motion.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте адрес, который выведет Vite (обычно `http://localhost:5173`).

Сборка для продакшена:

```bash
npm run build
npm run preview
```

## Как редактировать

Всё содержимое (имя, тексты, фото, кнопки, цвета, финальное поздравление)
находится в одном файле:

```
src/config/siteData.ts
```

Просто откройте его и замените текст на свой.

## Как добавить фотографии

1. Положите файлы в `public/photos/` (jpg, jpeg, png, webp).
2. Укажите их имена в `siteData.ts`, например `"photos/photo1.jpg"`.

## Как добавить музыку

1. Положите файл `background.mp3` в `public/music/`.
2. В `siteData.ts` установите:

```ts
music: {
  enabled: true,
  src: "/music/background.mp3",
  volume: 0.25,
}
```

Музыка начнёт играть только после того, как пользователь нажмёт «Открыть» —
это сделано специально, чтобы браузер не блокировал автовоспроизведение.

## Включение/выключение эффектов

В том же файле `siteData.ts`:

```ts
features: {
  music: true,
  particles: true,
  lightbox: true,
  confetti: true,
  memories: true,
  petals: true,
}
```

## Структура

```
src/
├── components/   — переиспользуемые UI-компоненты
├── pages/        — 6 экранов истории
├── config/       — siteData.ts (редактируемый контент)
├── styles/       — глобальные стили
├── App.tsx       — навигация между экранами
└── main.tsx      — точка входа

public/
├── photos/       — ваши фотографии
└── music/        — фоновая музыка
```

Готово к деплою на Vercel, Netlify, GitHub Pages или любой статический хостинг
(после `npm run build` результат будет в папке `dist/`).

## Автопубликация через GitHub Pages (редактируете — сайт обновляется сам)

В проекте уже есть файл `.github/workflows/deploy.yml`. Он собирает и публикует
сайт автоматически при каждом изменении в ветке `main` — запускать `npm run build`
вручную не нужно.

**Разовая настройка (5 минут):**

1. Создайте новый репозиторий на github.com (например `birthday-site`), публичный
   или приватный — не важно.
2. Загрузите туда все файлы этого проекта (через `git push` или просто перетащив
   папку в веб-интерфейс GitHub — "Add file → Upload files").
3. В репозитории откройте **Settings → Pages**.
4. В поле **Source** выберите **GitHub Actions**.
5. Сохраните — через 1–2 минуты появится ссылка вида
   `https://ваш-логин.github.io/birthday-site/`.

**Дальше — просто редактируете и всё:**

- Открываете `src/config/siteData.ts` прямо на github.com (кнопка ✏️ "Edit"),
  меняете текст, нажимаете "Commit changes".
- Чтобы добавить фото — заходите в папку `public/photos`, "Add file → Upload files",
  перетаскиваете снимок.
- Через 1–2 минуты после сохранения сайт по ссылке обновится сам — GitHub Actions
  соберёт и опубликует новую версию автоматически. Ничего запускать не нужно.


## Mobile-Optimierung

Die aktuelle Version ist für Smartphones und Tablets optimiert:

- Responsive Breakpoints für kleine Smartphones ab ca. 320 px, Tablets und Desktop.
- Safe-Area-Unterstützung für iPhone-Notch/Home-Indicator.
- Buttons und Navigation mit mindestens 44 px Touch-Fläche.
- Galerie und Nachrichten wechseln auf sehr kleinen Displays automatisch auf eine Spalte.
- Lightbox unterstützt Wischen nach links/rechts sowie `Escape` und Pfeiltasten.
- Cursor-Glow wird auf Touch-Geräten nicht verwendet.
- Partikel werden auf mobilen Geräten reduziert, um Akku und GPU zu schonen.
- Unterstützung für `prefers-reduced-motion`.
- `100svh`/`100dvh` für moderne mobile Browser.
- Keine horizontale Seitenverschiebung durch Animationen.
- Bilder werden möglichst spät geladen und bleiben responsiv.

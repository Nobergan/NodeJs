# Cron jobs

### Cron jobs для очищення токенів
- Додано директорію `backend/src/crons/` з файлами:
  - `index.ts` — експортує `cronRunner()`, запускає `removeOldTokensCron` (тестовий крон закоментований).
  - `remove-old-tokens.cron.ts` — крон, що виконується щохвилини (`"0 * * * * *"`), видаляє старі refresh токени з БД.
  - `test.cron.ts` — тестовий крон (що 10 секунд), зараз не підключений.
- У `backend/src/main.ts`: імпортовано `cronRunner`, після старту сервера в callback `app.listen` викликається `await cronRunner()`. Текст логу змінено на `Server listening on ${config.PORT}`.

### Token repository
- У `backend/src/repositories/token.repository.ts` додано метод `deleteBeforeDate(date: Date): Promise<number>` — видаляє всі токени з `createdAt < date`, повертає кількість видалених документів.

### Time helper
- Додано `backend/src/helpers/time.helper.ts`: клас `TimeHelper` з методами:
  - `parseLifeTime(str)` — парсить рядок на кшталт `"7 days"` у `{ value, unit }`.
  - `subFromCurrentTime(value, unit)` — повертає дату «поточний час мінус вказаний проміжок» (через `dayjs`).

### Залежності бекенда
- У `backend/package.json` додано: `cron`, `dayjs` (dependencies), `@types/cron` (devDependencies). `@types/mongoose` перенесено в devDependencies (дублікат прибрано).

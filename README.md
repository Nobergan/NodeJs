# Node.js проєкт — dev-режим (backend + frontend + MongoDB)

Ця гілка налаштована під **локальну розробку**, де:

- бекенд (`backend/`) та фронтенд (`frontend/`) запускаються **на хості** через `npm`;
- MongoDB запускається в **Docker** через `docker-compose-dev.yml`.

---

## Структура

- `backend/` — Node.js / Express / TypeScript API.
- `frontend/` — React-додаток (Create React App + TypeScript).
- `docker-compose-dev.yml` — dev-конфіг для MongoDB (лише база даних).
- `mongo_db/` — дані MongoDB, які зберігаються на диску.
- `.env` / `.env.db` — змінні оточення для бекенду та БД відповідно.

---

## Попередні вимоги

- встановлений **Node.js** та **npm**;
- встановлений **Docker** та **Docker Compose**;
- в корені проєкту присутні файли `.env` та `.env.db` з коректними значеннями.

---

## Швидкий старт (рекомендований варіант)

Усі команди нижче виконуються з **кореня репозиторію** (`NodeJs`), якщо не вказано інше.

1. **Підняти MongoDB в Docker**

```bash
docker compose -f docker-compose-dev.yml up -d
```

Це:

- підніме контейнер `db` (MongoDB);
- пробросить порт `1234` на хості → Mongo буде доступна як  
  `mongodb://localhost:1234`;
- використає змінні з `.env.db` та volume `./mongo_db` для збереження даних;
- виконає `mongo-init.js` при першому старті (створення користувача/БД).

2. **Запустити бекенд (Node.js API)**

```bash
cd backend
npm install        # один раз
npm start
```

Скрипти з `backend/package.json`:

- `npm start`:
  - очищає папку `dist`;
  - компілює TypeScript;
  - запускає `src/main.ts` через `tsx` у режимі `--watch`.

Для коректної роботи потрібно налаштувати `.env` (див. нижче).

3. **Запустити фронтенд (React)**

В іншому терміналі:

```bash
cd frontend
npm install        # один раз
npm start
```

- відкриється dev-сервер на `http://localhost:3000`;
- запити з фронту мають ходити на бекенд (порт з `PORT` у `.env` бекенду, наприклад `http://localhost:5001`).

---

## Налаштування змінних оточення

### Бекенд (`.env`)

Мінімальний набір змінних (імена орієнтовні, звірити з кодом):

- `PORT=5001` — порт, на якому слухає бекенд локально;
- `MONGO_URI=mongodb://<USER>:<PASSWORD>@localhost:1234/<DB_NAME>` — строка підключення до MongoDB, яка піднята через `docker-compose-dev.yml`.

Значення `<USER>`, `<PASSWORD>`, `<DB_NAME>` повинні відповідати тим, що задані в `.env.db` та `mongo-init.js`.

### MongoDB (`.env.db`)

Файл використовується тільки Docker-ом для сервісу `db`:

- типові змінні: `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`, `MONGO_INITDB_DATABASE` тощо;
- саме ці значення потрібно використовувати в `MONGO_URI` бекенду.

---

## Детальніше про сервіси

### MongoDB (docker-compose-dev.yml)

Файл `docker-compose-dev.yml` містить сервіс:

- `db`:
  - образ: `mongo`;
  - порти: `1234:27017` (підключення з хоста: `mongodb://localhost:1234`);
  - `env_file: .env.db`;
  - volume `./mongo_db:/data/db` для збереження даних;
  - `./mongo-init.js` як init-скрипт при першому старті.

**Приклади підключення:**

- з бекенду: `MONGO_URI=mongodb://user:user@localhost:1234/nodejs-express-db`  
  (імена/паролі взяти з `.env.db` та `mongo-init.js`);
- з MongoDB Compass: `mongodb://user:user@localhost:1234/nodejs-express-db`;
- з `mongosh`:

```bash
mongosh "mongodb://user:user@localhost:1234/nodejs-express-db"
```

### Backend (Node.js / TypeScript)

Основні команди (у каталозі `backend`):

- `npm install` — встановити залежності;
- `npm start` — зібрати та запустити сервер з hot-reload;
- `PORT` та `MONGO_URI` беруться з `.env`.

Типовий URL бекенду після запуску:  
`http://localhost:<PORT>` (наприклад, `http://localhost:5001`).

### Frontend (React)

Основні команди (у каталозі `frontend`):

- `npm install` — встановити залежності;
- `npm start` — dev-режим з hot-reload на `http://localhost:3000`;
- `npm run build` — production-збірка у `frontend/build`;
- `npm run watch` — автозбірка через `npm-watch` за змінами у `src` (`ts, tsx, css`).

Фронтенд має бути налаштований на звернення до бекенду (URL API задається через відносний шлях або змінні оточення — див. реалізацію у `frontend/src`).

---

## Upload files (завантаження аватара)

Бекенд підтримує завантаження **аватара користувача**: зображення зберігаються на диску, шлях записується в поле `avatar` користувача в БД.

### Як це працює

- **Маршрут:** `PATCH /api/users/upload-avatar/:id`  
  (параметр `:id` — ID користувача).
- **Тіло запиту:** `multipart/form-data`, поле файлу має називатися **`avatar`**.
- **Дозволені формати:** JPEG, JPG, PNG, GIF (перевіряються і по розширенню, і по `Content-Type`).
- **Обмеження розміру:** 5 МБ на файл.
- **Збереження:** файли зберігаються в папці `backend/upload/` з унікальним ім’ям (UUID v6 + оригінальне розширення). У БД в профіль користувача записується повний шлях до файлу (наприклад, для подальшого відображення).

### Віддача завантажених файлів

Завантажені зображення віддаються бекендом як статика:

- **URL:** `GET /media/<ім'я_файлу>`  
  наприклад: `http://localhost:5001/media/1f1134f3-ca88-6fe0-acbe-8d151b2565fd.jpg`
- Фізично файли лежать у `backend/upload/`; Express обслуговує їх через `express.static("upload")` за префіксом `/media`.

### Де це реалізовано в коді

- **Конфіг Multer:** `backend/src/configs/multer.config.ts` — `storage` (папка `upload`, ім’я файлу = UUID + розширення), `fileFilter` (тільки зображення), `limits` (5 МБ).
- **Роутер:** `backend/src/routers/user.router.ts` — маршрут `PATCH /upload-avatar/:id` з `upload.single("avatar")`.
- **Контролер:** `backend/src/controllers/user.controller.ts` — метод `uploadAvatar`: перевірка наявності файлу, оновлення користувача полем `avatar: req.file.path`.
- **Статика:** `backend/src/main.ts` — `app.use("/media", express.static(path.join(process.cwd(), "upload")))`.

Для відображення аватара на фронті достатньо підставляти URL виду:  
`<BASE_URL_БЕКЕНДУ>/media/<ім'я_файлу>` (ім’я файлу можна отримати з поля `avatar` користувача, обрізавши шлях до `upload/...` або зберігаючи в БД лише ім’я файлу — залежно від поточної реалізації).

---

## Корисні команди

- **Підняти MongoDB (dev) у Docker:**

```bash
docker compose -f docker-compose-dev.yml up -d
```

- **Зупинити MongoDB та видалити контейнер (дані у `mongo_db/` збережуться):**

```bash
docker compose -f docker-compose-dev.yml down
```

- **Переглянути логи MongoDB:**

```bash
docker compose -f docker-compose-dev.yml logs -f db
```

- **Запустити бекенд з hot-reload:**

```bash
cd backend
npm start
```

- **Запустити фронтенд у dev-режимі:**

```bash
cd frontend
npm start
```

Цього набору команд достатньо, щоб у цій гілці повністю підняти MongoDB, бекенд та фронтенд у dev-режимі.

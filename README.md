# Node.js Full-Stack проект (Backend + Frontend + Nginx + MongoDB)

Проект складається з **бекенду** (Node.js/Express/TypeScript), **фронтенду** (React), **MongoDB** та **Nginx** як зворотного проксі. Все запускається через Docker Compose.

---

## Структура проекту

```
NodeJs/
├── backend/          # Node.js API (Express, TypeScript, Mongoose)
├── frontend/         # React-додаток (вихідний код)
├── client/           # Зібраний фронтенд для Nginx (статика)
├── mongo_db/         # Дані MongoDB (персистентний том)
├── nginx.conf        # Конфіг Nginx (проксі на API)
├── mongo-init.js     # Скрипт ініціалізації користувача БД
├── Dockerfile        # Образ для бекенду
├── docker-compose.yml
├── .env              # Змінні для бекенду (створити з .env.example)
└── .env.db           # Змінні для MongoDB
```

---

## Що потрібно встановити

- **Docker** та **Docker Compose**
- **Node.js** (для локальної розробки фронтенду та бекенду)
- **npm** або **yarn**

---

## Швидкий старт (все в Docker)

### 1. Клонувати репозиторій та перейти в папку

```bash
git clone <url-репозиторію> NodeJs
cd NodeJs
```

### 2. Налаштувати змінні оточення

Скопіювати приклад і заповнити значення:

```bash
cp .env.example .env
```

Відредагувати `.env`. Мінімум для запуску:

- `PORT=5001` — порт бекенду всередині контейнера (не змінювати для Docker)
- `MONGO_URI=mongodb://user:user@db:27017/nodejs-express-db` — підключення до MongoDB у мережі Docker
- JWT-секрети та інші поля за потреби (див. `.env.example`)

Файл `.env.db` вже є; при потребі змінити логін/пароль БД там і в `mongo-init.js`.

### 3. Зібрати фронтенд і покласти його в `client/`

Nginx віддає статику з папки `client/`, тому спочатку потрібно зібрати React-додаток:

```bash
cd frontend
npm install
npm run build
cp -r build/* ../client/
cd ..
```

Якщо папки `client/` ще немає — створити її і потім копіювати:

```bash
mkdir -p ../client
cp -r build/* ../client/
```

### 4. Запустити всі сервіси

З кореня проекту:

```bash
docker compose up --build
```

Або у фоновому режимі:

```bash
docker compose up --build -d
```

### 5. Відкрити в браузері

- Сайт (фронт + API через Nginx): **http://localhost**
- API напряму (без Nginx): **http://localhost:5555**

---

## Основні команди для роботи з проектом

### Docker

| Команда | Опис |
|--------|------|
| `docker compose up --build` | Зібрати образи і запустити контейнери (логи в консоль) |
| `docker compose up --build -d` | Те саме, але у фоновому режимі |
| `docker compose down` | Зупинити і видалити контейнери |
| `docker compose down -v` | Зупинити контейнери і видалити томи (у т.ч. дані MongoDB у томах) |
| `docker compose ps` | Показати статус сервісів |
| `docker compose logs -f` | Дивитися логи всіх сервісів (Ctrl+C — вихід) |
| `docker compose logs -f app` | Логи тільки бекенду |
| `docker compose logs -f db` | Логи тільки MongoDB |
| `docker compose restart app` | Перезапустити тільки бекенд |

### Бекенд (локально, без Docker)

Якщо хочете запускати API на своїй машині (наприклад, для дебагу):

```bash
cd backend
npm install
```

У `.env` вказати:

- `PORT=5001` (або інший вільний порт)
- `MONGO_URI=mongodb://user:user@localhost:1234/nodejs-express-db` — якщо MongoDB у Docker на порту 1234

Потім:

```bash
npm start
```

Це збирає TypeScript і запускає сервер з hot-reload.

### Фронтенд (локально, режим розробки)

Режим розробки з hot-reload на порту 3000:

```bash
cd frontend
npm install
npm start
```

У браузері відкриється **http://localhost:3000**. Щоб фронт ходив на API через Nginx (порт 80), Nginx і бекенд мають бути запущені (наприклад, через `docker compose up`). Якщо API на іншому порту — у коді фронту використовується відносний шлях `/api/`, тому при `localhost:3000` потрібно або проксі в `package.json`, або змінна оточення для base URL.

### Збірка фронтенду після змін

Після змін у `frontend/` запустити збірку — результат автоматично потрапляє в `client/` (див. нижче):

```bash
cd frontend
npm run build
```

Потім перезавантажити сторінку в браузері.

### npm-watch — авто-перезбірка фронтенду

У проекті використовується **npm-watch** (`^0.13.0`): він слідкує за змінами в `frontend/src` (файли `js`, `css`) і автоматично запускає `npm run build`.

Запустити сторожіння:

```bash
cd frontend
npm run watch
```

Після кожного білду зміни самі копіюються в `client/` — нічого робити вручну не потрібно.

**Де це налаштовано:** у `frontend/package.json`:

- Секція **`"watch"`** — для npm-watch: `"patterns": ["src"]`, `"extensions": "js, css"`; при зміні файлів викликається скрипт `build`.
- Скрипт **`"postbuild"`** — npm автоматично запускає його після успішного `build`; там виконується копіювання `build/*` у `../client/`, щоб Nginx одразу віддавав оновлений фронт.

### MongoDB (підключення з хоста)

Порти з `docker-compose`: MongoDB доступна на **localhost:1234**.

- **MongoDB Compass:** `mongodb://user:user@localhost:1234/nodejs-express-db`
- **mongosh:**

```bash
mongosh "mongodb://user:user@localhost:1234/nodejs-express-db"
```

---

## Порти

| Сервіс | Порт на хості | Опис |
|--------|----------------|------|
| Nginx | 80 | Сайт і проксі на API (`/api/` → бекенд) |
| Backend (app) | 5555 | Прямий доступ до API без Nginx |
| MongoDB (db) | 1234 | Підключення до БД з хоста |

---

## Як це працює локально (через Docker)

Усе крутиться **локально в Docker**: браузер спілкується тільки з Nginx на твоєму комп’ютері, доступ до MongoDB йде лише з бекенду всередині Docker, не напряму з браузера.

**Ланцюжок запитів:**

1. **Ти відкриваєш у браузері** `http://localhost` (порт 80 на твоїй машині).
2. **На порту 80 слухає контейнер Nginx** (сервіс `web`). Він приймає всі запити.
3. **Якщо запит за статикою** (HTML, JS, CSS, картинки) — Nginx віддає файли з папки `client/` (там лежить зібраний React).
4. **Якщо запит починається з `/api/`** — Nginx не віддає файл, а **проксує** його в контейнер з бекендом (`app`), який слухає порт 5001 всередині мережі Docker.
5. **Бекенд у контейнері `app`** обробляє запит і при потребі звертається до **MongoDB у контейнері `db`** (по імені `db` і порту 27017 всередині Docker). Користувач і браузер до MongoDB напряму не підключаються.
6. Відповідь повертається назад: **app** → Nginx → браузер.

**Коротко:** браузер ↔ лише Nginx (localhost:80); Nginx ↔ статика з `client/` або проксі на `app`; `app` ↔ `db` (MongoDB). Усе це локально в Docker, без прямого доступу до Mongo з твого ПК у цій робочій схемі.

---

## Типові кроки після клонування

```bash
cd NodeJs
cp .env.example .env
# Відредагувати .env (PORT=5001, MONGO_URI=mongodb://user:user@db:27017/nodejs-express-db тощо)

cd frontend && npm install && npm run build && cp -r build/* ../client/ && cd ..
docker compose up --build
```

Далі відкрити **http://localhost** у браузері.

---

## Можливі проблеми

- **Порт 80 зайнятий** — змінити в `docker-compose.yml` у сервісі `web`: наприклад, `"8080:80"` і тоді заходити на http://localhost:8080.
- **Порт 5555 або 1234 зайнятий** — аналогічно змінити маппінг портів у `docker-compose.yml`.
- **Порожня сторінка після відкриття localhost** — перевірити, що виконано `npm run build` у `frontend/` і скопійовано вміст `build/` у `client/`.
- **API не відповідає** — перевірити логи: `docker compose logs app`, і що в `.env` вказано `PORT=5001` та коректний `MONGO_URI` для мережі Docker (`db:27017`).

Якщо потрібно, можна додати окремі секції під Windows або production-деплой.

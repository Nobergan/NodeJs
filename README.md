# Pizza Shop — Node.js Backend

REST API для інтернет-магазину піци, побудований на основі Node.js, Express, TypeScript та MongoDB.

## Стек технологій

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **База даних:** MongoDB (Mongoose)
- **Аутентифікація:** JWT (jsonwebtoken)
- **Валідація:** Joi
- **Завантаження файлів:** Multer
- **Документація API:** Swagger UI (swagger-ui-express + OpenAPI 3.0)
- **Email:** Nodemailer
- **Лінтер:** ESLint + Prettier

## Запуск проєкту

```bash
cd backend
npm install
npm run dev
```

Сервер запускається на `http://localhost:5001`.

## Документація API

Після запуску сервера документація доступна за адресою:

```
http://localhost:5001/docs
```

### Задокументовані ендпоінти

#### Auth

| Метод | Шлях | Опис |
|-------|------|------|
| `POST` | `/auth/sign-up` | Реєстрація нового користувача |
| `POST` | `/auth/sign-in` | Вхід в систему |

#### Pizza

| Метод | Шлях | Опис |
|-------|------|------|
| `GET` | `/pizzas` | Отримати список піц з пагінацією та фільтрами |

Query параметри для `/pizzas`:
- `page` (обов'язковий) — номер сторінки
- `pageSize` — кількість елементів на сторінці (за замовчуванням 10)
- `price` — фільтр за ціною
- `diameter` — фільтр за діаметром

#### Users

| Метод | Шлях | Опис |
|-------|------|------|
| `GET` | `/users/:userId` | Отримати користувача за ID |

### Авторизація

Захищені ендпоінти використовують **Bearer JWT** токен:

```
Authorization: Bearer <accessToken>
```

## Що було зроблено (поточні зміни)

### Інтеграція Swagger / OpenAPI документації

- Встановлено пакети: `swagger-ui-express`, `@types/swagger-ui-express`, `openapi-types`
- Створено файл `backend/src/configs/swagger.config.ts` з повним OpenAPI 3.0 описом API:
  - Описано схеми запитів та відповідей для всіх ендпоінтів
  - Додано схему JWT Bearer авторизації
  - Теги: `Auth`, `Pizza`, `Users`
- У `backend/src/main.ts` підключено Swagger UI на маршруті `/docs`

### Оновлення залежностей

- Пакет `multer` оновлено з `^2.0.2` до `2.1.1` (нова версія прибрала залежності `mkdirp`, `xtend`, `object-assign`)

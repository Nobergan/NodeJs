# NodeJs

## Пагінація та фільтри (Users API)

У цій гілці реалізовано пагінацію та фільтри для ендпоінту отримання списку користувачів на бекенді.

### Огляд змін

#### Ендпоінт `GET /users`

Ендпоінт підтримує query-параметри для пагінації, пошуку та сортування.

##### Query-параметри

| Параметр   | Тип    | Обов'язковий | За замовчуванням | Опис                                                                 |
| ---------- | ------ | ------------ | ---------------- | -------------------------------------------------------------------- |
| `pageSize` | number | ні           | 10               | Кількість записів на сторінці (1–100)                                |
| `page`     | number | ні           | 1                | Номер сторінки (мінімум 1)                                           |
| `search`   | string | ні           | —                | Пошук за ім'ям або прізвищем (регістронезалежний, часткове збігання) |
| `order`    | string | ні           | —                | Сортування: `name`, `-name`, `age`, `-age` (префікс `-` = спадання)  |

##### Приклад відповіді

```json
{
  "totalItems": 42,
  "totalPages": 5,
  "prevPage": false,
  "nextPage": true,
  "data": [
    {
      "_id": "...",
      "email": "user@example.com",
      "name": "John",
      "surname": "Doe",
      "age": 25,
      ...
    }
  ]
}
```

---

### Технічна реалізація

#### Нові файли

- **`backend/src/interfaces/paginated-response.interface.ts`** — інтерфейс для пагінованої відповіді:
  - `totalItems` — загальна кількість записів
  - `totalPages` — кількість сторінок
  - `prevPage` — чи є попередня сторінка
  - `nextPage` — чи є наступна сторінка
  - `data` — масив елементів

- **`backend/src/enums/user-query-order.enum.ts`** — enum полів для сортування (`name`, `age`).

#### Змінені файли

- **`backend/src/interfaces/user.interface.ts`**  
  Додано інтерфейс `IUserQuery` з полями `pageSize`, `page`, `search`, `order`.

- **`backend/src/repositories/user.repository.ts`**  
  Метод `getAllUsers` переписаний з використанням MongoDB aggregation:
  - `$match` — фільтрація (пошук за `name`/`surname`, виключення `isDeleted`)
  - `$sort` — сортування за `order`
  - `$facet` — паралельно отримання `totalItems` і поточної сторінки
  - `$skip` та `$limit` — пагінація
  - У відповіді не повертається `password`.

- **`backend/src/services/user.service.ts`**  
  `getAllUsers` тепер повертає `IPaginatedResponse<IUser>` з обробкою шляхів для `avatar` (`/media/...`).

- **`backend/src/controllers/user.controller.ts`**  
  Використовується `validatedQuery` з middleware замість прямого доступу до `req.query`.

- **`backend/src/routers/user.router.ts`**  
  Для `GET /` додано `commonMiddleware.query(UserValidator.query)` для валідації query.

- **`backend/src/validators/user.validator.ts`**  
  Додано `query`-схему:
  - `pageSize`: 1–100, default 10
  - `page`: min 1, default 1
  - `search`: опціональний рядок
  - `order`: дозволені значення enum або їх варіанти з `-` для спадання

- **`backend/src/middlewares/common.middleware.ts`**  
  Додано метод `query()` для валідації query-параметрів і запису результату в `req.validatedQuery`.

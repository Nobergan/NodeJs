// OpenAPIV3 — типи для опису документа у форматі OpenAPI 3.0
// swaggerUI — middleware для Express, який рендерить інтерактивний UI у браузері
import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

// Головний об'єкт документації. Тип OpenAPIV3.Document гарантує
// правильну структуру згідно зі специфікацією OpenAPI 3.0
const swaggerDocument: OpenAPIV3.Document = {
    // Версія специфікації OpenAPI
    openapi: "3.0.0",

    // Загальна інформація про API — відображається у шапці Swagger UI
    info: {
        title: "Pizza API Documentation",
        version: "1.0.0",
        description: "API documentation for Pizza Shop",
    },

    // Список серверів, до яких відносяться описані ендпоінти.
    // Swagger UI використовує перший сервер у списку як базовий URL для запитів "Try it out"
    servers: [
        {
            url: "http://localhost:5001",
            description: "Local server",
        },
    ],

    // Теги — це групи, за якими Swagger UI розбиває ендпоінти у документації.
    // Кожен ендпоінт нижче посилається на один або кілька тегів через поле tags: []
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoints",
        },
        {
            name: "Pizza",
            description: "Pizza endpoints",
        },
        {
            name: "Users",
            description: "Pizza endpoints",
        },
    ],

    // paths — опис всіх ендпоінтів API.
    // Ключ — URL маршруту, значення — об'єкт з HTTP-методами (get, post, put, delete...)
    paths: {
        // ─── AUTH ────────────────────────────────────────────────────────────────

        "/auth/sign-up": {
            post: {
                tags: ["Auth"], // до якої групи належить ендпоінт
                summary: "Register new user", // короткий опис у списку

                // requestBody — тіло запиту, яке клієнт надсилає на сервер
                requestBody: {
                    required: true,
                    content: {
                        // формат тіла запиту — JSON
                        "application/json": {
                            schema: {
                                type: "object",
                                // properties — перелік полів об'єкта з їх типами
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password", // поле відображається як ***
                                    },
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    age: { type: "integer" },
                                },
                                // required — поля, без яких запит вважається невалідним
                                required: [
                                    "email",
                                    "password",
                                    "name",
                                    "surname",
                                    "age",
                                ],
                            },
                        },
                    },
                },

                // responses — можливі відповіді сервера, ключ — HTTP-статус код
                responses: {
                    // 201 Created — користувача успішно створено
                    "201": {
                        description: "User successfully registered",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        // user — дані щойно створеного користувача
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                age: { type: "integer" },
                                                avatar: { type: "string" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        // tokens — пара JWT токенів для подальших запитів
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    // 400 Bad Request — невалідні дані у запиті
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            default: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/auth/sign-in": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                                required: ["email", "password"],
                            },
                        },
                    },
                },
                responses: {
                    // 200 OK — успішний вхід, повертає користувача і токени
                    "200": {
                        description: "User successfully logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                age: { type: "integer" },
                                                avatart: { type: "string" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        // ─── PIZZA ───────────────────────────────────────────────────────────────

        "/pizzas": {
            get: {
                tags: ["Pizza"],
                summary: "Get all pizzas with pagination and filters",
                // security — вказує, що ендпоінт захищений схемою bearerAuth (JWT).
                // Swagger UI покаже кнопку "Authorize" для введення токена
                security: [{ bearerAuth: [] }],

                // parameters — параметри запиту.
                // in: "query" означає, що параметр передається в URL (?page=1&pageSize=10)
                // in: "path"  означає, що параметр є частиною URL (/users/:userId)
                parameters: [
                    {
                        name: "pageSize",
                        in: "query",
                        description: "Number of items per page",
                        schema: { type: "integer", default: 10 },
                    },
                    {
                        name: "page",
                        in: "query",
                        required: true,
                        description: "Page number",
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "price",
                        in: "query",
                        description: "Filter by price",
                        schema: { type: "integer" },
                    },
                    {
                        name: "diameter",
                        in: "query",
                        description: "Filter by diameter",
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    "200": {
                        description: "List of pizzas with pagination",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totalItems: { type: "integer" }, // загальна кількість піц у БД
                                        totalPages: { type: "integer" }, // загальна кількість сторінок
                                        prevPage: { type: "boolean" }, // чи існує попередня сторінка
                                        nextPage: { type: "boolean" }, // чи існує наступна сторінка
                                        // data — масив піц на поточній сторінці
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: { type: "string" },
                                                    name: { type: "string" },
                                                    price: { type: "integer" },
                                                    diameter: {
                                                        type: "integer",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        // ─── USERS ───────────────────────────────────────────────────────────────

        // {userId} — динамічний path-параметр, передається як частина URL (/users/abc123)
        "/users/{userId}": {
            get: {
                tags: ["Users"],
                summary: "Get user by id",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "userId",
                        in: "path", // параметр є частиною URL, а не query-рядком
                        description: "Get user by id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Successfully get user by id",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        role: { type: "string" },
                                        name: { type: "string" },
                                        surname: { type: "string" },
                                        age: { type: "integer" },
                                        avatart: { type: "string" },
                                        isActive: { type: "boolean" },
                                        isDeleted: { type: "boolean" },
                                        isVerified: { type: "boolean" },
                                        _id: { type: "string" },
                                        createdAt: { type: "string" },
                                        updatedAt: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    // components — переиспользовувані елементи документації (схеми, параметри, відповіді тощо)
    components: {
        // securitySchemes — опис схем авторизації.
        // Тут визначається bearerAuth, на яку посилаються ендпоінти через security: [{ bearerAuth: [] }]
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer", // тип схеми — Bearer token у заголовку Authorization
                bearerFormat: "JWT", // підказка для UI, що токен є JWT (лише для відображення)
            },
        },
    },
};

export { swaggerDocument, swaggerUI };

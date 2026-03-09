import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";
import { UserQueryOrder } from "../enums/user-query-order.enum";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static name = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static age = joi.number().min(2).max(100);

    public static createUser = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static updateUser = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim(),
        order: joi
            .string()
            .valid(
                ...Object.values(UserQueryOrder),
                ...Object.values(UserQueryOrder).map((item) => `-${item}`),
            ),
    });
}

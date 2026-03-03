import joi from "joi";

import { PizzaQueryOrderEnum } from "../enums/pizza-query-order.enum";

export class PizzaValidator {
    private static name = joi.string().min(2).max(255).trim();
    private static price = joi.number().min(1).max(1_000_000);
    private static diameter = joi.number().min(1).max(255);

    public static createPizza = joi.object({
        name: this.name.required(),
        price: this.price.required(),
        diameter: this.diameter.required(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        name: joi.string().trim(),
        price: joi.number().min(1).max(100),
        order: joi
            .string()
            .valid(
                ...Object.values(PizzaQueryOrderEnum),
                ...Object.values(PizzaQueryOrderEnum).map((item) => `-${item}`),
            ),
    });
}

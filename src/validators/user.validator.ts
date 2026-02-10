import joi from "joi";

export class UserValidator {
    static name = joi.string().min(3).max(50).trim();
    static surname = joi.string().regex(/^[A-Z][a-z]{1,9}$/);
    static age = joi.number().min(2).max(100);

    public static createUser = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static updateUser = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
}

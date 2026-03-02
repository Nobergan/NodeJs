import joi from "joi";

export class RecoveryValidator {
    private static emailField = joi.string().email().trim();

    public static emailSchema = joi.object({
        email: this.emailField.required(),
    });
}

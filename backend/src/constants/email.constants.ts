import { Email } from "../enums/email.enum";

export type EmailData = {
    subject: string;
    template: string;
};

export type EmailConstants<T extends Record<string, string>> = {
    [key in keyof T]: EmailData;
};

export const emailConstants: EmailConstants<typeof Email> = {
    [Email.WELCOME]: {
        subject: "Welcome",
        template: "welcome",
    },
    [Email.ACTIVATE]: {
        subject: "Account activation",
        template: "activate",
    },
    [Email.RECOVERY]: {
        subject: "Password recovery",
        template: "recovery",
    },
};

import fs from "node:fs/promises";
import path from "node:path";

import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { config } from "../configs/config";
import { EmailData } from "../constants/email.constants";

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD,
            },
        });
    }

    private async _renderTemplate(
        template: string,
        context: Record<string, any>,
    ): Promise<string> {
        const layoutSource = await fs.readFile(
            path.join(process.cwd(), "src", "templates", "base.hbs"),
            "utf-8",
        );
        const layotTemplate = handlebars.compile(layoutSource);

        const templateSource = await fs.readFile(
            path.join(process.cwd(), "src", "templates", `${template}.hbs`),
            "utf-8",
        );
        const childTemplate = handlebars.compile(templateSource);

        const childHtml = childTemplate(context);

        return layotTemplate({ ...context, body: childHtml });
    }

    public async sendEmail(
        to: string,
        emailData: EmailData,
        context: Record<string, any>,
    ): Promise<void> {
        await this.transporter.sendMail({
            to,
            subject: emailData.subject,
            html: await this._renderTemplate(emailData.template, context),
        });
    }
}

export const emailService = new EmailService();

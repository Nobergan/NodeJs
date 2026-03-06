import { CronJob } from "cron";

import { emailConstants } from "../constants/email.constants";
import { Email } from "../enums/email.enum";
import { User } from "../models/user.model";
import { emailService } from "../services/email.service";

const handler = async () => {
    try {
        const users = await User.find();

        for (const user of users) {
            const userEmail = user.email;
            const userName = user.name;

            await emailService.sendEmail(
                userEmail,
                emailConstants[Email.SPAM_EMAIL],
                {
                    name: userName,
                },
            );
        }
    } catch (e) {
        console.error(e.message);
    }
};

export const sendSpamEmailCron = new CronJob("0 * * * * *", handler);

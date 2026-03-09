import { removeOldTokensCron } from "./remove-old-tokens.cron";
// import { sendSpamEmailCron } from "./spam-email.cron";
// import { testCron } from "./test.cron";

export const cronRunner = async () => {
    // testCron.start();
    removeOldTokensCron.start();
    // sendSpamEmailCron.start();
};

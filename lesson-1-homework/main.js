const afs = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');

const copyEmailsByDomain = async () => {
    const filePath = path.join('lesson-1-homework', 'emails.txt');
    const fileStream = fs.createReadStream(filePath, 'utf-8');
    const rlInterface = readline.createInterface({ input: fileStream });

    /***  ***/
    /*** WriteStream ***/
    /***  ***/
    const domainToStream = {
        '@gmail.com': fs.createWriteStream('./lesson-1-homework/gmailEmails.txt'),
        '@ukr.net': fs.createWriteStream('./lesson-1-homework/ukrNetEmails.txt'),
        '@mail.ru': fs.createWriteStream('./lesson-1-homework/mailEmails.txt'),
        '@plusgmail.ru': fs.createWriteStream('./lesson-1-homework/plusgmailEmails.txt'),
        '@top.bxox.info': fs.createWriteStream('./lesson-1-homework/topBxoxInfoEmails.txt'),
        '@yeah.net': fs.createWriteStream('./lesson-1-homework/yeahNetEmails.txt'),
        '@yandex.ru': fs.createWriteStream('./lesson-1-homework/yandexEmails.txt'),
        '@test.ru': fs.createWriteStream('./lesson-1-homework/testEmails.txt'),
        '@artquery.info': fs.createWriteStream('./lesson-1-homework/artqueryInfoEmails.txt'),
    };

    try {
        for await (const email of rlInterface) {
            for (const domain in domainToStream) {
                if (email.trim().endsWith(domain)) {
                    domainToStream[domain].write(`${email}\n`);
                }
            }
        }
    } finally {
        await rlInterface.close();
    }

    /***  ***/
    /*** appendFile ***/
    /***  ***/
    // const domainToFile = {
    //     '@gmail.com': './lesson-1-homework/gmailEmails.txt',
    //     '@ukr.net': './lesson-1-homework/ukrNetEmails.txt',
    //     '@mail.ru': './lesson-1-homework/mailEmails.txt',
    //     '@plusgmail.ru': './lesson-1-homework/plusgmailEmails.txt',
    //     '@top.bxox.info': './lesson-1-homework/topBxoxInfoEmails.txt',
    //     '@yeah.net': './lesson-1-homework/yeahNetEmails.txt',
    //     '@yandex.ru': './lesson-1-homework/yandexEmails.txt',
    //     '@test.ru': './lesson-1-homework/testEmails.txt',
    //     '@artquery.info': './lesson-1-homework/artqueryInfoEmails.txt',
    // };
    //
    // try {
    //     for await (const email of rlInterface) {
    //         for (const domain in domainToFile) {
    //             if (email.trim().endsWith(domain)) {
    //                 await afs.appendFile(domainToFile[domain], `${email}\n`);
    //             }
    //         }
    //     }
    // } finally {
    //     await rlInterface.close();
    // }

    /***  ***/
    /*** gmail appendFile ***/
    /***  ***/
    // try {
    //     for await (const email of rlInterface) {
    //         if (email.trim().endsWith('@gmail.com')) {
    //             await afs.appendFile('./lesson-1-homework/gmailEmails.txt', `${email}\n`);
    //         }
    //     }
    // } finally {
    //     await rlInterface.close();
    // }

    /***  ***/
    /*** gmail WriteStream ***/
    /***  ***/
    // const gmailStream = fs.createWriteStream('./lesson-1-homework/gmailEmails.txt');
    //
    // try {
    //     for await (const email of rlInterface) {
    //         if (email.trim().endsWith('@gmail.com')) {
    //             gmailStream.write(email + '\n');
    //         }
    //     }
    // } finally {
    //     await rlInterface.close();
    //     gmailStream.end();
    // }

}

copyEmailsByDomain().catch(console.error);

const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(process.cwd(), 'lesson-2-express', 'db', 'users.json');

const read = async () => {
    try {
        const json = await fs.readFile(filePath, 'utf8');

        return json ? JSON.parse(json) : [];
    } catch (error) {
        console.log('Error', error.message);
        return [];
    }
};

const write = async (users) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null,2));
    } catch (error) {
        console.log('Error', error.message);
    }
}

module.exports = { read, write };

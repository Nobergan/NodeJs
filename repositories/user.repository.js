const {read, write} = require("../lesson-2-express/services/fs.service");

class UserRepository {
    async getAll() {
     return read();
    }

    async getUserById(id) {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id))

        return users[index];
    }

    async create(user) {
     const users = await read();
     const newUsers = {
         id: users.length ? users[users.length - 1].id + 1 : 1,
         name: user.name,
         surname: user.surname,
         age: user.age
     };

     users.push(newUsers);
     await write(users);
     return newUsers;
    }
}

const userRepository = new UserRepository();

module.exports = { userRepository };
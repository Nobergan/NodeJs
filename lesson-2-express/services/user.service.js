const { userRepository } = require("../../repositories/user.repository");

class UserService {
    async getAll() {
        return await userRepository.getAll();
    }

    async getUsersById(id) {
        return await userRepository.getUserById(id)
    }

    async create(user) {
        return await userRepository.create(user);
    }

    async updateUsersById(id, data) {
        return await userRepository.updateUserById(id, data)
    }

    async deleteUsersById(id) {
        return await userRepository.deleteUserById(id)
    }
}

const userService = new UserService();

module.exports = { userService };
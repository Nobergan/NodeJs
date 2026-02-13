import { StatusCodes } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IUser,
    UserCreateDTO,
    UserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAllUsers(): Promise<IUser[]> {
        return userRepository.getAllUsers();
    }

    public createUser(user: UserCreateDTO): Promise<IUser> {
        return userRepository.createUser(user);
    }

    public async getUserById(userId: string): Promise<IUser> {
        const user = await userRepository.getUserById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodes.NOT_FOUND);
        }

        return user;
    }

    public async updateUserById(
        userId: string,
        user: UserUpdateDTO,
    ): Promise<IUser> {
        const data = await userRepository.updateUserById(userId, user);

        if (!data) {
            throw new ApiError("User not found", StatusCodes.NOT_FOUND);
        }

        return await userRepository.updateUserById(userId, user);
    }

    public async deleteUserById(userId: string): Promise<void> {
        const data = await userRepository.deleteUserById(userId);

        if (!data) {
            throw new ApiError("User not found", StatusCodes.NOT_FOUND);
        }

        await userRepository.deleteUserById(userId);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getUserByEmail(email);

        if (user) {
            throw new ApiError(
                "User is already exists",
                StatusCodes.BAD_REQUEST,
            );
        }
    }
}

export const userService = new UserService();

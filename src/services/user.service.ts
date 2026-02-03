import { userRepository } from "../repositories/user.repository";
import { IUser, UserDTO } from "../interfaces/user.interface";

class UserService {
    public getAllUsers(): Promise<IUser[]> {
        return userRepository.getAllUsers();
    }

    public createUser(user: UserDTO): Promise<IUser> {
        return userRepository.createUser(user);
    }

    public getUserById(userId: string): Promise<IUser | null> {
        return userRepository.getUserById(userId);
    }
}

export const userService = new UserService();

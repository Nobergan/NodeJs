import { IUser, UserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

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

    public updateUserById(userId: string, data: IUser): Promise<IUser | null> {
        return userRepository.updateUserById(userId, data);
    }

    public deleteUserById(userId: string): Promise<IUser | null> {
        return userRepository.deleteUserById(userId);
    }
}

export const userService = new UserService();

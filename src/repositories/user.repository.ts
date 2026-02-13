import {
    IUser,
    UserCreateDTO,
    UserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAllUsers(): Promise<IUser[]> {
        return User.find();
    }

    public createUser(user: UserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public getUserById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }

    public updateUserById(
        userId: string,
        data: UserUpdateDTO,
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, data, { new: true });
    }

    public deleteUserById(userId: string): Promise<IUser | null> {
        return User.findByIdAndDelete(userId);
    }

    public getUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }
}

export const userRepository = new UserRepository();

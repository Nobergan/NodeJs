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

    public blockUser(userId: string | string[]): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true },
        );
    }

    public unBlockUser(userId: string | string[]): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true },
        );
    }
}

export const userRepository = new UserRepository();

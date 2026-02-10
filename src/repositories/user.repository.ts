import { IUser, UserDTO } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAllUsers(): Promise<IUser[]> {
        return User.find();
    }

    public createUser(user: UserDTO): Promise<IUser> {
        return User.create(user);
    }

    public getUserById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }

    public updateUserById(userId: string, data: IUser): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, data, { new: true });
    }

    public deleteUserById(userId: string): Promise<IUser | null> {
        return User.findByIdAndDelete(userId);
    }
}

export const userRepository = new UserRepository();

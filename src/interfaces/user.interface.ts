import { Role } from "../enums/role.enum";
import { IBase } from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: Role;
    name: string;
    surname: string;
    age: number;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}

export type UserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;

export type UserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;

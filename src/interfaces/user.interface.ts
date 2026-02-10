export interface IUser {
    _id: number;
    name: string;
    surname: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
}

export type UserDTO = Pick<IUser, "name" | "surname" | "age">;

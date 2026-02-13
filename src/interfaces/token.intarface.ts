import { Role } from "../enums/role.enum";
import { IBase } from "./base.interface";

export interface IToken extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

export type ITokenModel = Pick<
    IToken,
    "accessToken" | "refreshToken" | "_userId"
>;

export interface ITokenPayload {
    userId: string;
    role: Role;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
export type IRefresh = Pick<IToken, "refreshToken">;

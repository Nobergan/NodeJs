import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/status-codes.enum";
import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.status(StatusCodes.OK).json(users);
        } catch (error) {
            next(error);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = String(req.params.id);
            const userById = await userService.getUserById(userId);

            res.status(StatusCodes.OK).json(userById);
        } catch (error) {
            next(error);
        }
    }

    public async updateUserById(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const data = req.body as IUser;
            const userId = String(req.params.id);
            const user = await userService.updateUserById(userId, data);

            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async deleteUserById(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userId = String(req.params.id);
            await userService.deleteUserById(userId);

            res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();

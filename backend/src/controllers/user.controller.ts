import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.intarface";
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

    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals
                .tokenPayload as ITokenPayload;

            if (userId === myId) {
                throw new ApiError("Not permitted", StatusCodes.FORBIDDEN);
            }
            const user = await userService.blockUser(userId);

            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async unBlockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals
                .tokenPayload as ITokenPayload;

            if (userId === myId) {
                throw new ApiError("Not permitted", StatusCodes.FORBIDDEN);
            }
            const user = await userService.unBlockUser(userId);

            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);

            if (!user) {
                throw new ApiError("User not found", StatusCodes.BAD_REQUEST);
            }

            if (!req.file) {
                throw new ApiError("No file uploaded", StatusCodes.BAD_REQUEST);
            }

            console.log(req.file.path, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            const data = await userService.updateUserById(id, {
                avatar: req.file.path,
            });
            res.status(StatusCodes.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();

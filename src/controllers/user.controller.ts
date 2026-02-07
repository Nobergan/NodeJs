import {userService} from "../services/user.service";
import {Request, Response} from "express";
import {IUser, UserDTO} from "../interfaces/user.interface";
import {StatusCodes} from "../enums/status-codes.enum";

class UserController {
    public async getAllUsers(req: Request, res: Response) {
        const users = await userService.getAllUsers();
        res.status(StatusCodes.OK).json(users);
    }

    public async createUser(req: Request, res: Response) {
        const user = req.body as UserDTO;
        const data = await userService.createUser(user);

        res.status(StatusCodes.CREATED).json(data);
    }

    public async getUserById(req: Request, res: Response) {
        const userId = String(req.params.id);
        const userById = await userService.getUserById(userId)

        res.status(StatusCodes.OK).json(userById);
    }

    public async updateUserById(req: Request, res: Response) {
        const data = req.body as IUser;
        const userId = String(req.params.id);
        const user = await userService.updateUserById(userId, data)

        res.status(StatusCodes.OK).json(user);
    }

    public async deleteUserById(req: Request, res: Response) {
        const userId = String(req.params.id);
        await userService.deleteUserById(userId)

        res.status(StatusCodes.NO_CONTENT).end();
    }
}

export const userController = new UserController();

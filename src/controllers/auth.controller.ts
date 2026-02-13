import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/status-codes.enum";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPayload } from "../interfaces/token.intarface";
import { UserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as UserCreateDTO;
            const data = await authService.signUp(body);

            return res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IAuth;
            const data = await authService.signIn(body);

            return res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;
            const user = await userService.getUserById(userId);

            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { role, userId } = req.res.locals
                .tokenPayload as ITokenPayload;
            const tokens = tokenService.generateToken({ role, userId });
            await tokenRepository.createToken({
                ...tokens,
                _userId: userId,
            });

            res.status(StatusCodes.OK).json(tokens);
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();

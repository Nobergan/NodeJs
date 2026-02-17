import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenType } from "../enums/action-token-type";
import { Email } from "../enums/email.enum";
import { StatusCodes } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair } from "../interfaces/token.intarface";
import { IUser, UserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(
        user: UserCreateDTO,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);

        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.createUser({ ...user, password });
        const tokens = tokenService.generateToken({
            userId: newUser._id,
            role: newUser.role,
        });

        await tokenRepository.createToken({ ...tokens, _userId: newUser._id });

        const token = tokenService.generateActionToken(
            {
                userId: newUser._id,
                role: newUser.role,
            },
            ActionTokenType.ACTIVATE,
        );
        await emailService.sendEmail(
            newUser.email,
            emailConstants[Email.ACTIVATE],
            {
                name: newUser.name,
                url: `${config.FRONTEND_URL}/activate/${token}`,
            },
        );

        return { user: newUser, tokens };
    }

    public async signIn(
        dto: IAuth,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getUserByEmail(dto.email);

        if (!user) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodes.UNAUTHORIZED,
            );
        }

        const isValidPassword = await passwordService.comparePassword(
            dto.password,
            user.password,
        );

        if (!user.isActive) {
            throw new ApiError("Account is inactive", StatusCodes.FORBIDDEN);
        }

        if (!isValidPassword) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodes.UNAUTHORIZED,
            );
        }

        const tokens = tokenService.generateToken({
            userId: user._id,
            role: user.role,
        });

        await tokenRepository.createToken({ ...tokens, _userId: user._id });

        return { user, tokens };
    }

    public async activate(token: string): Promise<IUser> {
        const { userId } = tokenService.verifyToken(
            token,
            ActionTokenType.ACTIVATE,
        );
        return await userService.updateUserById(userId, { isActive: true });
    }

    public async recoveryPasswordRequest(user: IUser): Promise<void> {
        const token = tokenService.generateActionToken(
            { userId: user._id, role: user.role },
            ActionTokenType.RECOVERY,
        );

        await emailService.sendEmail(
            user.email,
            emailConstants[Email.RECOVERY],
            {
                url: `${config.FRONTEND_URL}/recovery/${token}`,
            },
        );
    }

    public async recoveryPassword(
        token: string,
        password: string,
    ): Promise<IUser> {
        const { userId } = tokenService.verifyToken(
            token,
            ActionTokenType.RECOVERY,
        );

        const hashedPassword = await passwordService.hashPassword(password);
        return await userService.updateUserById(userId, {
            password: hashedPassword,
        });
    }
}

export const authService = new AuthService();

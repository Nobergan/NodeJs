import { TemplatesConstants } from "../constants/templates.constants";
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
        await emailService.sendEmail(
            newUser.email,
            "Welcome",
            TemplatesConstants.WELCOME,
            { name: newUser.name },
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
}

export const authService = new AuthService();

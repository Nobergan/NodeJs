import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ActionTokenType } from "../enums/action-token-type";
import { StatusCodes } from "../enums/status-codes.enum";
import { TokenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.intarface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
    public generateToken(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });

        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });

        return { accessToken, refreshToken };
    }

    public verifyToken(
        token: string,
        type: TokenType | ActionTokenType,
    ): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case TokenType.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenType.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case ActionTokenType.ACTIVATE:
                    secret = config.JWT_ACTIVATE_SECRET;
                    break;
                case ActionTokenType.RECOVERY:
                    secret = config.JWT_RECOVERY_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodes.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new ApiError("Invalid token", StatusCodes.UNAUTHORIZED);
        }
    }

    public generateActionToken(
        payload: ITokenPayload,
        type: ActionTokenType,
    ): string {
        let secret: string;
        let expiresIn: any;

        switch (type) {
            case ActionTokenType.ACTIVATE:
                secret = config.JWT_ACTIVATE_SECRET;
                expiresIn = config.JWT_ACTIVATE_LIFETIME;
                break;
            case ActionTokenType.RECOVERY:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;
            default:
                throw new ApiError(
                    "Invalid action token type",
                    StatusCodes.BAD_REQUEST,
                );
        }

        return jwt.sign(payload, secret, { expiresIn });
    }

    public async isTokenExists(
        token: string,
        type: TokenType,
    ): Promise<boolean> {
        const tokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!tokenPromise;
    }
}

export const tokenService = new TokenService();

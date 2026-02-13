import { IToken } from "../interfaces/token.intarface";
import { Token } from "../models/token.model";

class TokenRepository {
    public createToken(dto: any): Promise<IToken> {
        return Token.create(dto);
    }

    public findByParams(params: Partial<IToken>): Promise<IToken> {
        return Token.findOne(params);
    }
}

export const tokenRepository = new TokenRepository();

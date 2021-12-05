const jwt = require("jsonwebtoken");
const config = require("../../../../config/auth.config");

 class TokensHelper {
    tokensRepository;

    constructor(payload) {
        const {
            tokensRepository,
            accessToken,
            refreshToken
        } = payload;

        this.tokensRepository = tokensRepository;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    };

      async updateTokens({role, userId}) {
        const accessToken = this.accessToken.generateToken({userId, role});
        const refreshToken = this.refreshToken.generateToken({userId});
 
        try {
          await this.replaceDbRefreshToken(userId, refreshToken, role)
 
        return {
                accessToken,
                refreshToken
            };
        } catch (error) {
            throw error;
        }
      }

      async replaceDbRefreshToken(userId, refreshToken, role) {
        try {
            const fields = {
                token: refreshToken,
                userId,
                role
            }

            let token = await this.tokensRepository.getToken(userId);

            if (!token) {
                await this.tokensRepository.addToken(fields);
            }

            if (token) {
                await this.tokensRepository.updateToken(token.id, fields );
            }

        } catch (error) {
            throw error;
        }
      }
}

class Token {
    createJwtToken(expiredTime, signature, secret) {
        return jwt.sign(signature, secret, {
          expiresIn: expiredTime
        });
      }
}

class AccessToken extends Token {
    constructor() {
        super();
    }

    generateToken (payload) {
        const { userId, role } = payload
        const jwtSignatureAccess = {
            id: userId,
            role,
            type: config.accessToken.type
        };

        const accessToken = this.createJwtToken(config.accessToken.expired, jwtSignatureAccess, config.accessToken.salt);

        return accessToken;
    }

    getToken(payload) {
        if (!payload) return this.token;
    }

}

class RefreshToken extends Token {
    token;

    constructor() {
        super();
    }

    generateToken(payload) {
        const { userId } = payload;

        const jwtSignatureRefresh = {
            type: config.refreshToken.type,
            userId: userId
        }
     
        const refreshToken = this.createJwtToken(config.refreshToken.expired, jwtSignatureRefresh, config.refreshToken.salt);
        this.token = refreshToken;

        return refreshToken;
    }

    async getToken(payload) {

        const { userId, tokensRepository } = payload;

        try {
            const token = await tokensRepository.getToken(userId);

             if (!token) {
                 throw "no token at db"
             }
 
             return token;
         } catch (error) {
          throw error
         }
    }

}

module.exports = {
    TokensHelper,
    RefreshToken,
    AccessToken
}
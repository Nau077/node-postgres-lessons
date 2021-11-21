const jwt = require("jsonwebtoken");

module.exports = class TokensHelper {
    tokensRepository;

    constructor() {
        this.tokensRepository = this.tokensRepository;
    };

    createJwtToken(expiredTime, signature, secret) {
        return jwt.sign(signature, secret, {
          expiresIn: expiredTime
        });
      }

      async updateTokens(userId) {
            const jwtSignatureAccess = {
                id: user.id,
                type: config.accessToken.type
            };
            const jwtSignatureRefresh = {
                type: config.refreshToken.type
            }
    
        const accessToken = this.createJwtToken(config.accessToken.expired, jwtSignatureAccess, config.accessToken.salt);
        const refreshToken = this.createJwtToken(config.refreshToken.expired, jwtSignatureRefresh, config.refreshToken.salt);

        try {
          await this.replaceDbRefreshToken(userId, refreshToken);  
        } catch (error) {
            throw error;
        }
        
          return {
              accessToken,
              refreshToken
          };
      }

      async replaceDbRefreshToken(userId, refreshToken) {
        try {
            let token = await this.tokensRepository.getToken(userId);

            const fields = {
                token: refreshToken,
                userId: user.id
            }

            if (!token) {
                token =  await this.tokensRepository.addToken(this.reduceFields(fields));
            }

            if (token) {
                token =  await this.tokensRepository.updateToken(token.id, fields );
            }            
        } catch (error) {
            throw error;
        }
      }
}
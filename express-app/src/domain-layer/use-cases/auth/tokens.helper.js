const jwt = require("jsonwebtoken");
const config = require("../../../../config/auth.config");
const { v4: uuidv4 } = require("uuid");
const { InvalidTokenError, errors } = require("../../../utils/error.util");

class TokensHelper {
  tokensRepository;

  constructor(payload) {
    const { tokensRepository, accessToken, refreshToken } = payload;

    this.tokensRepository = tokensRepository;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  async updateTokens({ role, userId }) {
    const accessToken = this.accessToken.generateToken({ userId, role });
    const refreshToken = this.refreshToken.generateToken({ userId });

    try {
        await this.replaceDbRefreshToken(userId, refreshToken, role);
  
        return {
          accessToken,
          refreshToken,
        };
      } catch (error) {
        throw error;
      }    
  }

  async replaceDbRefreshToken(userId, refreshToken, role) {
    try {
        const fields = {
          token: refreshToken,
          user_id: userId,
          role,
        };
  
        const token = await this.tokensRepository.getToken(userId);
  
        if (!token) {
          await this.tokensRepository.addToken(fields);
        }
  
        if (token) {
          await this.tokensRepository.updateToken(token.id, fields);
        }
      } catch (error) {
        throw error;
      }    
  }
}

class Token {
  createJwtToken(expiredTime, signature, secret) {
    return jwt.sign(signature, secret, {
      expiresIn: expiredTime,
    });
  }    
}

class AccessToken extends Token {
  constructor() {
    super();
  }

  generateToken(payload) {
    const { userId, role } = payload;
    const jwtSinatureAccess = {
      id: userId,
      role,
      type: config.accessToken.type,
    };

    const accessToken = this.createJwtToken(
      config.accessToken.expired,
      jwtSinatureAccess,
      config.accessToken.salt
    );

    return accessToken;
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
      userId,
      id: uuidv4(),
    };

    const refreshToken = this.createJwtToken(
      config.refreshToken.expired,
      jwtSignatureRefresh,
      config.refreshToken.salt
    );

    this.token = refreshToken;

    return refreshToken;
  }

  async getToken(payload) {
    const { userId, tokensRepository } = payload;
 
    try {
      const token = await tokensRepository.getToken(userId);
 
      if (!token) {
        throw new InvalidTokenError(errors.get("INVALID_TOKEN"));
      }

      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  TokensHelper,
  RefreshToken,
  AccessToken,
};

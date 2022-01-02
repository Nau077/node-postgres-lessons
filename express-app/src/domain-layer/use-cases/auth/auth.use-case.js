const TokensRepository = require("../../../data-layer/tokens.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../../../config/auth.config");
const { TokensHelper, AccessToken, RefreshToken } = require("./tokens.helper");
const {
  UserNotFoundError,
  InvalidTokenError,
  ExpiredTokenError,
  BadRequestError,
  PropertyRequiredError,
  errors,
} = require("../../../utils/error.util");
const REFRESH_TYPE = "refresh";

module.exports = class AuthUseCase {
  useCase;
  tokensRepository;
  refreshToken;
  tokensHelper;

  constructor(useCase) {
    this.useCase = useCase;
    this.refreshToken = new RefreshToken();
    this.tokensRepository = new TokensRepository();

    const accessToken = new AccessToken();
    const tokensRepository = this.tokensRepository;
    const refreshToken = this.refreshToken;

    this.tokensHelper = new TokensHelper({
        tokensRepository,
        accessToken,
        refreshToken,
      });
  }

  async signIn({ role, phoneNumber, password }) {
    try {
        const user = await this.useCase.getOne(phoneNumber);
  
        if (!user) {
          throw new UserNotFoundError(errors.get("USER_NOT_FOUND"));
        }
  
        const passwordIsValid = bcrypt.compareSync(
          String(password),
          String(user.password)
        );
  
        if (!passwordIsValid) {
          throw new UserNotFoundError(errors.get("USER_NOT_FOUND"));
        }
  
        const payload = {
          role,
          userId: user.id,
        };
  
        const tokens = await this.tokensHelper.updateTokens(payload);
  
        return {
          tokens,
        };
      } catch (error) {
        throw error;
      }      
  }

  async signUp(fields) {
    let testFields = [...fields];
    const password = testFields.find((el) => el.password);
    const passwordIndex = testFields.findIndex((el) => el.password);

    if (!password) {
        throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    };

    try {
        const hashedPassword = bcrypt.hashSync(String(password["password"]), 8);
  
        testFields.splice(1, passwordIndex);
        testFields.push({ password: hashedPassword });
  
        const payload = {
          data: {
            fields: testFields,
          },
        };
  
        const message = await this.useCase.addOne(payload);
  
        return message;
      } catch (e) {
        throw e;
      }
  }

  async refreshTokens(refreshToken) {
    let userId;
    let tokenId;

    try {
        const payload = jwt.verify(refreshToken, config.refreshToken.salt);
        userId = payload.userId;
        tokenId = payload.id;
  
        if (payload.type !== REFRESH_TYPE) {
          throw new InvalidTokenError(errors.get("INVALID_TOKEN"));
        }
      } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
          throw new ExpiredTokenError(errors.get("EXPIRED_TOKEN"));
        }
  
        if (e instanceof jwt.JsonWebTokenError) {
          throw new InvalidTokenError(errors.get("INVALID_TOKEN"));
        }
  
        throw new BadRequestError(errors.get("BAD_REQ"));
      }

      try {
        const tokenData = await this.refreshToken.getToken({
          userId,
          tokensRepository: this.tokensRepository,
        });
  
        const dbRefreshToken = jwt.verify(
          tokenData.token,
          config.refreshToken.salt
        );
  
        if (!tokenData) {
          throw new BadRequestError(errors.get("BAD_REQ"));
        }
  
        if (dbRefreshToken.id !== tokenId) {
          throw new InvalidTokenError(errors.get("INVALID_TOKEN"));
        }
  
        const tokens = await this.tokensHelper.updateTokens({
          role: tokenData.role,
          userId: tokenData.user_id,
        });
  
        return {
          tokens,
        };
      } catch (error) {
        throw error;
      }    
  }
};

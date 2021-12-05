const TokensRepository = require("../../../data-layer/tokens.repository");
const HandlerUseCase = require("../common/handler.use-case");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../../../config/auth.config");
const { TokensHelper, AccessToken, RefreshToken } = require("./tokens.helper");

module.exports = class AuthUseCase extends HandlerUseCase{
    useCase;
    tokensRepository;
    refreshToken;

    constructor(useCase) {
        const mapFields = {
            userId: "userId",
            token: "token"
          };

        super(mapFields);
        
        this.useCase = useCase;
        this.refreshToken = new RefreshToken();
        this.tokensRepository = new TokensRepository();

        const accessToken = new AccessToken();
        const tokensRepository = this.tokensRepository;
        const refreshToken = this.refreshToken;

        this.tokensHelper = new TokensHelper({ 
            tokensRepository,
            accessToken,
            refreshToken
        });
    }

    async signIn({role, phoneNumber, password}) {
        const user = await this.useCase.getOne(phoneNumber);

        if (!user) {
          return {
            code: 401,
            message: "Пользователь не найден"
          };
        }

        const passwordIsValid = bcrypt.compareSync(String(password), String(user.password));
        
        if (!passwordIsValid) {
          return res.status(401).send({
            code: 401,
            accessToken: null,
            message: "Пользователь не найден"
          });
        }
        const payload = {
            role,
            userId: user.id
        }
 
        const tokens = await this.tokensHelper.updateTokens(payload);

        return {
          code: 200,
          tokens,
          message: "Авторизация прошла успешно"
        };
      }

      async signUp(fields) {
        const testFields = [...fields];
        const password = testFields.find(el => el.password);
        const passwordIndex = testFields.findIndex(el => el.password);
 
        try {
          const hashedPassword = bcrypt.hashSync(String(password["password"]), 8);

            testFields.splice(1, passwordIndex);
            testFields.push({"password": hashedPassword})

          const payload = {
            data: {
                fields: [
                    ...testFields
                ]
            }
          };

          const message = await this.useCase.addOne(payload);
    
          return message;
        } catch (error) {
          throw error;
        }
      }

      async refreshTokens(refreshToken) {

        let userId;

        try {
           const payload = jwt.verify(refreshToken, config.refreshToken.salt)
            userId = payload.userId;

            if (payload.type !== "refresh") {
                throw "invalid token"
            }

        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                throw "token expired"
            } else if (
                e instanceof jwt.JsonWebTokenError
            ) {
                throw "invalid token"
            } else {
                throw("unexpected error")
            }
        }
 
        const tokenData =  await this.refreshToken.getToken({
            userId,
            tokensRepository: this.tokensRepository
        });

        if (!tokenData) {
            throw "no refresh token at db"
        }

        const tokens =  await this.tokensHelper.updateTokens({
            role: tokenData.role,
            userId: tokenData.userId
        }).catch(error => {
            throw error
        });

        return {
            tokens
          };
      }
}
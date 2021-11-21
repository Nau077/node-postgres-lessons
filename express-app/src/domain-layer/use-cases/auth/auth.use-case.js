const TokensRepository = require("../../../data-layer/tokens.repository");
const HandlerUseCase = require("../common/handler.use-case");
const jwt = require("jsonwebtoken");
const config = require("../../../../config/auth.config");
const TokensHelper = require("./tokens.helper");

module.exports = class AuthUseCase extends HandlerUseCase{
    useCase;
    tokensRepository;

    constructor({ useCase }) {
        this.useCase = useCase;
        this.tokensRepository = new TokensRepository();
        this.tokensHelper = new TokensHelper();
        
        super.mapFields = {
            userId: "userId",
            token: "token"
          };
    }

    async signIn(phoneNumber, password) {
        const user = await this.useCase.getOne(phoneNumber);
    
        if (!user) {
          return {
            code: 401,
            message: "Пользователь не найден"
          };
        }
    
        const passwordIsValid = bcrypt.compareSync(password, user.password);
    
        if (!passwordIsValid) {
          return res.status(401).send({
            code: 401,
            accessToken: null,
            message: "Пользователь не найден"
          });
        }
 
        const tokens = await this.tokensHelper.updateTokens(user.id);

        return {
          code: 200,
          tokens,
          message: "Авторизация прошла успешно"
        };
      }

      async signUp(data) {
        const useCase = new this.UseCase();

        try {
          const hashedPassword = bcrypt.hashSync(password, 8);
          const payload = {
            ...data,
            password: hashedPassword,
          };

          const message = await useCase.createOne(payload);
    
          return message;
        } catch (error) {
          throw error;
        }
      }

      async refreshTokens(refreshToken) {

        let payload;

        try {
            payload = jwt.verify(refreshToken, config.refreshToken.salt)

            if (payload.type !== "refresh") {
                throw "invalid token"
            }

        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                throw "token expired"
            } else if (
                e instanceof jwt.JsonWebTokenError
            ) {
                throw "invaluid token"
            }
        }

        const tokens = await this.tokensHelper.updateTokens(payload.userId);

        return {
            code: 200,
            tokens
          };
      }
}
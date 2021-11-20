const AuthHelper = require("./common/auth.helper");

module.exports = class AuthUseCase {
    useCase;

    constructor({ useCase }) {
        this.useCase = useCase;
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
    
        const jwtSignature = {
          id: user.id,
          name: user.name
        };
    
        const accessToken = this.createJwtToken(config.accessToken.expired, jwtSignature, config.accessToken.salt);
        const refreshToken = this.createJwtToken(config.refreshToken.expired, jwtSignature, config.refreshToken.salt)

        return {
          code: 200,
          tokens: {
              accessToken,
              refreshToken
          },
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

      createJwtToken(expiredTime, signature, secret) {
        return jwt.sign(signature, secret, {
          expiresIn: expiredTime
        });
      }

      updateToken() {

      }
}
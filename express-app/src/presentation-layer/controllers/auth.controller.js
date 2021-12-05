const AuthUseCase = require("../../domain-layer/use-cases/auth/auth.use-case")
const authStrategy = require("../../domain-layer/use-cases/auth/auth-strategy");

exports.signUp = async (req, res) => {
  if (!req.body || !req.body.role ) throw res.json("hahakek");

    const role = req.body.role;
    const fields = req.body.fields;

    if (!authStrategy[role]) {
       throw("no role")
    };

    try {
        const userUseCase = new authStrategy[role];
        const authUseCase = new AuthUseCase(userUseCase);
        const data = await authUseCase.signUp(fields);

        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send(error);
    }
};

exports.signIn = async (req, res) => {
    if (!req.body || !req.body.role || !req.body.fields) throw res.json("hahakek");

    const role = req.body.role;

    const phoneNumber = req.body.fields.find(el => el.phone_number);
    const password = req.body.fields.find(el => el.password);

    if (!authStrategy[role]) {
        return;
    };

    try {
        const userUseCase = new authStrategy[role];
        const authUseCase = new AuthUseCase(userUseCase);
        const payload = {
            role,
            phoneNumber: phoneNumber.phone_number,
            password: password.password
        };
        const tokens = await authUseCase.signIn(payload);

        return res.status(200).send(tokens);
    } catch (error) {
        return res.status(400).send(error);
    }
};

exports.refreshTokens = async (req, res) => {
    if (!req.body || !req.body.refreshToken ) throw res.json("no refresh token at body");

    try {
        const authUseCase = new AuthUseCase();
        const tokens = await authUseCase.refreshTokens(req.body.refreshToken);

        return res.status(200).send(tokens);
    } catch (error) {
        return res.status(400).send(error);
    }

}

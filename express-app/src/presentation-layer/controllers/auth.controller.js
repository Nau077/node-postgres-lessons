const AuthUseCase = require("../../domain-layer/use-cases/auth/auth.use-case");
const {
  authStrategy,
} = require("../../domain-layer/use-cases/auth/auth-strategy");
const { PropertyRequiredError, errors } = require("../../utils/error.util");

exports.signUp = async (req, res) => {
  if (!req.body || !req.body.role) {
    return res.send(new PropertyRequiredError(errors.get("NO_PROPERTY")));
  }

  const role = req.body.role;
  const fields = req.body.fields;

  if (!authStrategy[role]) {
    return res.send(new PropertyRequiredError(errors.get("NO_PROPERTY")));
  }

  try {
    const userUseCase = new authStrategy[role]();
    const authUseCase = new AuthUseCase(userUseCase);
    const data = await authUseCase.signUp(fields);

    return res.status(200).send(data);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.signIn = async (req, res) => {
  if (!req.body || !req.body.role) {
    return res.send(new PropertyRequiredError(errors.get("NO_PROPERTY")));
  }

  const role = req.body.role;
  const phoneNumber = req.body.fields.find((el) => el.phone_number);
  const password = req.body.fields.find((el) => el.password);

  if (!authStrategy[role]) {
    return res.send(new PropertyRequiredError(errors.get("NO_PROPERTY")));
  }

  try {
    const userUseCase = new authStrategy[role]();
    const authUseCase = new AuthUseCase(userUseCase);
    const payload = {
      role,
      phoneNumber: phoneNumber.phone_number,
      password: password.password,
    };
    const tokens = await authUseCase.signIn(payload);

    return res.status(200).send(tokens);
  } catch (e) {
    return res.send(e);
  }
};

exports.refreshTokens = async (req, res) => {
  if (!req.body || !req.body.refreshToken) {
    return res.send(new PropertyRequiredError(errors.get("NO_PROPERTY")));
  }

  try {
    const authUseCase = new AuthUseCase();
    const tokens = await authUseCase.refreshTokens(req.body.refreshToken);

    return res.status(200).send(tokens);
  } catch (error) {
    return res.send(error);
  }
};


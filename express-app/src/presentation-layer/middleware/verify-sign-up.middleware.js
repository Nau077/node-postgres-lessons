const {
    authStrategy,
  } = require("../../domain-layer/use-cases/auth/auth-strategy");
  const {
    RoleNotFoundError,
    UserExistsError,
    PropertyRequiredError,
    errors,
  } = require("../../utils/error.util");
  
  checkRolesExisted = async (req, res, next) => {
    const role = req.body.role;
  
    if (!role) {
      return res.send(new RoleNotFoundError(errors.get("ROLE_NOT_FOUND")));
    }
  
    if (!authStrategy[role]) {
      return res.send(new RoleNotFoundError(errors.get("ROLE_NOT_FOUND")));
    }
  
    next();
  };
  
  checkDuplicateUserPhone = async (req, res, next) => {
    const role = req.body.role;
  
    if (!req.body.fields) {
      return res.send(new PropertyRequiredError(errors.get("NO_PROPERTY")));
    }
  
    const phoneNumber = req.body.fields.find((el) => el.phone_number);
  
    if (!phoneNumber) {
      return res.send(new PropertyRequiredError(errors.get("NO_PROPERTY")));
    }
  
    const userUseCase = new authStrategy[role]();
  
    const user = await userUseCase.getOne(phoneNumber.phone_number);
  
    if (user) {
      return res.send(new UserExistsError(errors.get("USER_EXISTS")));
    }
  
    next();
  };
  
  const verifySignUp = {
    checkDuplicateUserPhone,
    checkRolesExisted,
  };
  
  module.exports = verifySignUp;
  
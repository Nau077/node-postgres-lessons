const errors = new Map([
  ["NO_PROPERTY", "Неверные поля переданы"],
  ["DATA_BASE_ERROR", "Внутренняя ошибка"],
  ["USER_NOT_FOUND", "Пользователь не найден"],
  ["INVALID_TOKEN", "Токен невалиден"],
  ["EXPIRED_TOKEN", "Токен истёк"],
  ["TOKEN_NOT_PROVIDED", "Токен необеспечен"],
]);

const codes = new Map([
  ["BAD_REQ", 400],
  ["NO_PROPERTY", 405],
  ["DATA_BASE_ERROR", 400],
  ["USER_NOT_FOUND", 401],
  ["INVALID_TOKEN", 401],
  ["EXPIRED_TOKEN", 401],
  ["TOKEN_NOT_PROVIDED", 401]
]);

class BaseError extends Error {
  statusCode;

  constructor(name, statusCode) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

class BadRequestError extends BaseError {
  constructor(name, statusCode = codes.get("BAD_REQ")) {
    super(name, statusCode);
  }
}

class PropertyRequiredError extends BaseError {
  constructor(message, statusCode = codes.get("NO_PROPERTY")) {
    super(message, statusCode);
  }
}

class DataBaseError extends BaseError {
  constructor(message, statusCode = codes.get("DATA_BASE_ERROR")) {
    super(message, statusCode);
  }
}

class UserNotFoundError extends BaseError {
    constructor(message, statusCode = codes.get("USER_NOT_FOUND")) {
      super(message, statusCode);
    }
  }

class InvalidTokenError extends BaseError {
    constructor(message, statusCode = codes.get("INVALID_TOKEN")) {
      super(message, statusCode);
    }
  }

class ExpiredTokenError extends BaseError {
    constructor(message, statusCode = codes.get("EXPIRED_TOKEN")) {
        super(message, statusCode);
    }
}

class TokenNotProvidedError extends BaseError {
    constructor(message, statusCode = codes.get("TOKEN_NOT_PROVIDED")) {
        super(message, statusCode);
    }
}


module.exports = {
  PropertyRequiredError,
  BadRequestError,
  DataBaseError,
  UserNotFoundError,
  InvalidTokenError,
  ExpiredTokenError,
  TokenNotProvidedError,
  codes,
  errors,
};

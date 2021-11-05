const errors = new Map([
    ["ATOMIC_ERROR", "Ошибка атомарности"],
    ["NO_DATABASE_RECORD", "Нет записи, найденных при удалении по соотв. параметру:"],
    ["NO_NEEDED_PARAMS",  "Нет данных для обновления"],
    ["WRONG_PARAMS", "Неверные поля переданы"]
  ]);

const codes = new Map([
    ["BAD_REQ", 400],
    ["NO_PROPERTY",  422]
  ]);


class BaseError extends Error {
    statusCode

    constructor(name, statusCode) {
      super();

      Object.setPrototypeOf(this, new.target.prototype)

      this.name = name
      this.statusCode = statusCode

      Error.captureStackTrace(this);
    }
}

class BadRequestError extends BaseError {
  constructor(name, statusCode = codes.get("BAD_REQ")) {
    super(name, statusCode);
  }
};

class PropertyRequiredError extends BaseError {
    constructor(message, statusCode = codes.get("BAD_REQ")) {
      super("Нет необходимого свойства: " + message, statusCode);
    }
  }

module.exports = {
    PropertyRequiredError,
    BadRequestError,
    codes,
    errors
}
const errors = new Map([
  ["NO_PROPERTY", "Неверные поля переданы"],
  ["DATA_BASE_ERROR", "Внутренняя ошибка"],
]);

const codes = new Map([
  ["BAD_REQ", 400],
  ["NO_PROPERTY", 422],
  ["DATA_BASE_ERROR", 405],
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

module.exports = {
  PropertyRequiredError,
  BadRequestError,
  DataBaseError,
  codes,
  errors,
};

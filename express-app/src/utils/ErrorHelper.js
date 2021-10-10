module.exports = class ApiError extends Error {
  error = {};
  constructor(code, message) {
    super();
    this.error = {
      code,
      message
    };
  }

  get $error() {
    return this.error;
  }
};

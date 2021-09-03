module.exports = class ApiError extends Error{
    error = {}
    constructor(code, message) {
        this.error = {
            code,
            message
        }
    }

    get $error() {
        return this.error
    }
}
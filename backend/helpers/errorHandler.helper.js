/**
 * Create custom `ErrorHandlerHelper` class
 * that inherit the behavior of the built-in Error class
 */
class ErrorHandlerHelper extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandlerHelper;

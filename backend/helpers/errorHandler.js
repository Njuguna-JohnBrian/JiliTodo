/**
 * Create custom `ErrorHandler` class
 * that inherit the behavior of the built-in Error class
 */
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;

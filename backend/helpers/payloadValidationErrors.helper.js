const { validationResult } = require("express-validator");
const ErrorHandler = require("./errorHandler.helper");

/**
 * @param {Request} req
 */
const payloadValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ErrorHandler(errors["errors"].map((error) => error.msg).join(" / ")),
      400,
    );
  }
  next();
};

module.exports = { payloadValidationErrors };

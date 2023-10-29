const { validationResult } = require("express-validator");
const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { hashPassword, createAuthCookie } = require("../../helpers/auth.helper");
const ErrorHandler = require("../../helpers/errorHandler.helper");

const registerUser = CatchAsyncErrors(async (req, res, next) => {
  /**
   * destructure properties
   */
  let { firstname, lastname, email, password } = req.body;

  /**
   * validate properties
   * throw errors if present
   */
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ErrorHandler(errors["errors"].map((error) => error.msg).join(" / ")),
      400,
    );
  }

  /**
   * hash password
   */
  password = await hashPassword(password);

  createAuthCookie(res, {
    firstname: firstname,
    lastname: lastname,
    email: email,
  });

  return res.status(200).json({
    success: true,
    message: "Registered successfully",
  });
});

module.exports = { registerUser };

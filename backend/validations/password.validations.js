const { check } = require("express-validator");
const passwordValidations = {
  forgotPassword: [
    check("email", "Email is required").notEmpty(),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
  ],
  resetPassword: [
    check("password", "Password is required").notEmpty(),
    check(
      "password",
      "Password must contain at least 1 digit,1 special character, 1 lowercase and 1 uppercase letter and be at least 6 characters long",
    ).matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "i",
    ),
    check("confirmPassword", "Confirm Password is required").notEmpty(),
    check("confirmPassword", "Confirm Password does not match password").custom(
      (value, { req }) => value === req.body.password,
    ),
  ],
};

module.exports = { passwordValidations };

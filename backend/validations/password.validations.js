const { check } = require("express-validator");
const passwordValidations = {
  forgotPassword: [
    check("email", "Email is required").notEmpty(),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
  ],
};

module.exports = { passwordValidations };

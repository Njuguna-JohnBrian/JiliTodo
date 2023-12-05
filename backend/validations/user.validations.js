const { check } = require("express-validator");
const { isUUID } = require("validator");

const userValidations = {
  updateProfile: [
    check("userId", "User not found or does not exist").custom(
      (value, { req }) => isUUID(value, 4),
    ),
    check("firstname", "Firstname is empty").optional().notEmpty().trim(),
    check("lastname", "Lastname is empty").optional().notEmpty().trim(),
    check("email", "Email is empty").optional().notEmpty(),
    check("email", "Email is not valid").optional().isEmail().normalizeEmail(),
  ],
};

module.exports = { userValidations };

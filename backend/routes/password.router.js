const express = require("express");
const { authValidations } = require("../validations/auth.validations");
const {
  payloadValidationErrors,
} = require("../helpers/payloadValidationErrors.helper");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/password/password.controller");

const { passwordValidations } = require("../validations/password.validations");

const password = express.Router();

const passwordBaseUrl = "/password";

/**
 * forgot password route
 */
password.post(
  passwordBaseUrl + "/forgot",
  passwordValidations["forgotPassword"],
  payloadValidationErrors,
  forgotPassword,
);

/**
 * reset password route
 */
password.post(
  passwordBaseUrl + "/reset/:token",
  passwordValidations["resetPassword"],
  payloadValidationErrors,
  resetPassword,
);

module.exports = { password };

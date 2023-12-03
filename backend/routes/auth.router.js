const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth/auth.controller");
const {
  payloadValidationErrors,
} = require("../helpers/payloadValidationErrors.helper");
const { authValidations } = require("../validations/auth.validations");

const auth = express.Router();

const authBaseUrl = "/auth";

/**
 * register route
 */
auth.post(
  authBaseUrl + "/register",
  authValidations["registration"],
  payloadValidationErrors,
  registerUser,
);

/**
 * login route
 */
auth.post(
  authBaseUrl + "/login",
  authValidations["login"],
  payloadValidationErrors,
  loginUser,
);

/**
 * logout route
 */
auth.post(authBaseUrl + "/logout", logoutUser);

module.exports = { auth };

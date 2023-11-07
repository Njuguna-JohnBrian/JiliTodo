const express = require("express");
const { check } = require("express-validator");

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

const authBaseUrl = "/auth/user";

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

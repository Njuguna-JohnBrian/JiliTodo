const express = require("express");
const { check } = require("express-validator");

const { registerUser } = require("../controllers/auth/auth.controller");
const {
  payloadValidationErrors,
} = require("../helpers/payloadValidationErrors.helper");
const { authValidations } = require("../validations/auth.validations");

const auth = express.Router();

const authBaseUrl = "/auth/user";

auth.post(
  authBaseUrl + "/register",
  authValidations["registration"],
  payloadValidationErrors,
  registerUser,
);

module.exports = { auth };

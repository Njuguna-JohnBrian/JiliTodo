const express = require("express");
const { updateProfile } = require("../controllers/user/user.controller");
const { userValidations } = require("../validations/user.validations");
const {
  payloadValidationErrors,
} = require("../helpers/payloadValidationErrors.helper");
const { isAuthenticated } = require("../middlewares/auth_middleware");

const user = express.Router();

const userBaseUrl = "/user";

/**
 * updateProfile route
 */
user.patch(
  userBaseUrl + "/update/:userId",
  isAuthenticated,
  userValidations["updateProfile"],
  payloadValidationErrors,
  updateProfile,
);

module.exports = { user };

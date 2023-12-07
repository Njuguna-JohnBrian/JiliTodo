const express = require("express");
const { userValidations } = require("../validations/user.validations");
const {
  isAuthenticated,
  authorizedRoles,
} = require("../middlewares/auth_middleware");
const { updateUserDetails } = require("../controllers/admin/admin.controller");
const {
  payloadValidationErrors,
} = require("../helpers/payloadValidationErrors.helper");

const admin = express.Router();

const adminBaseUrl = "/admin";

/**
 * update user
 */
admin.patch(
  adminBaseUrl + "/user/update-details/:userId",
  isAuthenticated,
  authorizedRoles("admin"),
  userValidations["updateProfile"],
  payloadValidationErrors,
  updateUserDetails,
);

module.exports = { admin };

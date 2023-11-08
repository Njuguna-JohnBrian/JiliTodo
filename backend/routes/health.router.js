const express = require("express");

const { checkHealth } = require("../controllers/health/health.controller");

const health = express.Router();

const healthBaseUrl = "/health";

health.get(healthBaseUrl, checkHealth);


module.exports = {health}
require("dotenv").config();

const express = require("express");
const swagger = require("swagger-ui-express");
const swaggerUi = require("./swagger.json");

const app = express();

const baseurl = "/api/jilitodo";

/**
 * allow json & url encoded payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * mount swagger
 */
app.use(baseurl + "/swagger", swagger.serve, swagger.setup(swaggerUi));

module.exports = app;

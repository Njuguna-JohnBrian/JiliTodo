require("dotenv").config();
const express = require("express");
const swagger = require("swagger-ui-express");

const swaggerUi = require("./swagger.json");
const { db_middleware } = require("./middlewares/db_middleware");
const { error_middleware } = require("./middlewares/error_middleware");
const { health } = require("./routes/health.router");
const { auth } = require("./routes/auth.router");

const app = express();

const baseurl = "/api/jilitodo";

/**
 * allow json & url encoded payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * mount db middleware
 */
app.use(db_middleware);

/**
 * mount routes
 */
app.use(baseurl, health);
app.use(baseurl, auth);

/**
 *mount error middleware
 */
app.use(error_middleware);

/**
 * mount swagger
 */
app.use(baseurl + "/swagger", swagger.serve, swagger.setup(swaggerUi));

module.exports = app;

const ErrorHandler = require("../helpers/errorHandler.helper");

const error_middleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (String(process.env.NODE_ENV) === "dev") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (String(process.env.NODE_ENV) === "prod") {
    let error = { ...err };

    error.message = err.message;

    // TOKEN ERRORS
    /**
     * wrong JWT error
     */
    if (err.name === "JsonWebTokenError") {
      error = new ErrorHandler("Token is invalid. Try Again", 400);
    }

    /**
     * Expired token error
     */
    if (err.name === "TokenExpiredError") {
      error = new ErrorHandler("Token is expired. Kindly login", 400);
    }

    // DB ERRORS
    /**
     * unique check  errors
     */
    if (new RegExp(/unique/i).test(err["routine"]?.toLowerCase())) {
      error = new ErrorHandler(
        "Duplicate entries not allowed. Please retry",
        409,
      );
    }

    /**
     * Unexpected token error
     */
    if (err.stack.includes("Unexpected token")) {
      error = new ErrorHandler("Please check your data format and retry", 400);
    }
    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { error_middleware };

//TODO:catch 'error' encountered due to wrong column reference

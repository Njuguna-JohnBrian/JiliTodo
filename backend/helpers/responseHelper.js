/**
 *
 * @param res
 * @param statusCode
 * @param isSuccess
 * @param message
 * @param result
 * @returns {*}
 */
const responseHelper = (res, statusCode, isSuccess, message, result) => {
  return res.status(statusCode).json({
    success: isSuccess,
    message: message,
    result: result,
  });
};

module.exports = { responseHelper };

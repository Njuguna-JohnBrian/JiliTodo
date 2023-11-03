const { CatchAsyncErrors } = require("../helpers/catchAsyncErrors.helper");
const ErrorHandler = require("../helpers/errorHandler.helper");
const { responseHelper } = require("../helpers/responseHelper");
/**
 *
 * @param {*} req request body object
 * @param {*} res response body object
 * @returns true if healthy, false if errored
 */
const checkHealth = CatchAsyncErrors(async (req, res, next) => {
  if (req.errored)
    return next(new ErrorHandler("Jilitodo api is running into problems"), 404);

  return responseHelper(res, 200, true, "Jilitodo api is healthy");
});

module.exports = { checkHealth };

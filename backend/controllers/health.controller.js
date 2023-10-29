const { CatchAsyncErrors } = require("../helpers/catchAsyncErrors");
const ErrorHandler = require("../helpers/errorHandler");
/**
 *
 * @param {*} req request body object
 * @param {*} res response body object
 * @returns true if healthy, false if errored
 */
const checkHealth = CatchAsyncErrors(async (req, res, next) => {
  if (req.errored)
    return next(new ErrorHandler("Jilitodo api is running into problems"), 404);

  return res.status(200).json({
    success: true,
    message: "Jilitodo api is healthy",
  });
});

module.exports = { checkHealth };

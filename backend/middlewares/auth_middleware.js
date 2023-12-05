const { CatchAsyncErrors } = require("../helpers/catchAsyncErrors.helper");
const ErrorHandler = require("../helpers/errorHandler.helper");
const { verifyToken } = require("../helpers/auth.helper");

const isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
  const token = String(req.headers["cookie"].replace("cookie=", ""));

  if (!token)
    return next(new ErrorHandler("Login first to access this resource", 400));

  req.user = verifyToken(token);

  next();
});

module.exports = { isAuthenticated };

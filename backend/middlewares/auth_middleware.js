const { CatchAsyncErrors } = require("../helpers/catchAsyncErrors.helper");
const ErrorHandler = require("../helpers/errorHandler.helper");
const { verifyToken } = require("../helpers/auth.helper");

const isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
  const token = String(req.headers["cookie"].replace("cookie=", ""));

  if (!token)
    return next(new ErrorHandler("Login first to access this resource", 400));

  const userTokenData = verifyToken(token);
  req.user = await req.db_context.exec("finduser", [userTokenData["email"]]);

  next();
});

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rolename)) {
      return next(
        new ErrorHandler(
          "You don't have permission to perform this action",
          403,
        ),
      );
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizedRoles };

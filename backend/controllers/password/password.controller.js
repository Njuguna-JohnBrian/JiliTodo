const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { responseHelper } = require("../../helpers/responseHelper");
const { isEmpty } = require("lodash/lang");
const {
  createCookie,
  decodeToken,
  verifyToken,
  hashPassword,
} = require("../../helpers/auth.helper");

const forgotPassword = CatchAsyncErrors(async (req, res, next) => {
  /**
   * destructure email property
   */
  let { email } = req.body;

  /**
   * check if user by email exists
   */
  const userExists = await req.db_context.search("Users", { email: email });

  if (isEmpty(userExists))
    return responseHelper(res, 404, false, `User by email ${email}  not found`);

  /**
   * create password reset token
   */
  const resetToken = createCookie(
    res,
    {
      email: email,
      userid: userExists["userid"],
    },
    false,
  );
  const updateData = {
    updateddtm: new Date().toISOString(),
    updatedby: userExists["id"],
    passwordresettoken: resetToken,
  };
  await req.db_context.update("Users", { id: userExists["id"] }, updateData);

  const resetUrl = `${req.protocol}://${req.get(
    "host",
  )}/password/reset/jilitodo/${resetToken}`;

  return responseHelper(res, 200, true, "Password reset email sent", resetUrl);
});

const resetPassword = CatchAsyncErrors(async (req, res, next) => {
  /**
   * get token, password & confirmation
   */
  let { password } = req.body;
  let { token } = req.params;

  const user = verifyToken(token);

  /**
   * check if user bt userid exists
   */
  const userExists = await req.db_context.search("Users", {
    userid: user.userid,
  });

  if (isEmpty(userExists) || userExists?.passwordresettoken !== token)
    return responseHelper(res, 404, false, "Token is expired or invalid");

  const updateData = {
    updateddtm: new Date().toISOString(),
    updatedby: userExists["id"],
    passwordresettoken: null,
    passwordhash: hashPassword(password),
  };

  await req.db_context.update("Users", { id: userExists["id"] }, updateData);

  return responseHelper(
    res,
    200,
    true,
    "Password reset successfully. Please login",
  );
});

module.exports = { forgotPassword, resetPassword };

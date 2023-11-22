const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { responseHelper } = require("../../helpers/responseHelper");
const { isEmpty } = require("lodash/lang");
const { createCookie } = require("../../helpers/auth.helper");
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
  await req.db_context.update(
    "Users",
    { userid: userExists["userid"] },
    updateData,
  );

  const resetUrl = `${req.protocol}://${req.get(
    "host",
  )}/password/reset/${resetToken}`;

  return responseHelper(res, 200, true, "Email sent successfully");
});

module.exports = { forgotPassword };

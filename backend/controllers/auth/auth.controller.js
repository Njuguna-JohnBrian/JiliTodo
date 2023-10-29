const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { hashPassword, createAuthCookie } = require("../../helpers/auth.helper");
const registerUser = CatchAsyncErrors(async (req, res, next) => {
  /**
   * destructure properties
   */
  let { firstname, lastname, email, password } = req.body;

  /**
   * hash password
   */
  password = await hashPassword(password);

  createAuthCookie(res, {
    firstname: firstname,
    lastname: lastname,
    email: email,
  });

  return res.status(200).json({
    success: true,
    message: "Registered successfully",
  });
});

module.exports = { registerUser };

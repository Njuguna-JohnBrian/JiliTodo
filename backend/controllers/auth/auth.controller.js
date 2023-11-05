const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { hashPassword, createAuthCookie } = require("../../helpers/auth.helper");
const { responseHelper } = require("../../helpers/responseHelper");

/**
 *
 * @type {function(*, *, *): Promise<Awaited<*>>}
 */
const registerUser = CatchAsyncErrors(async (req, res, next) => {
  /**
   * destructure properties
   */
  let { firstname, lastname, email, password } = req.body;

  /**
   * check if user exists
   */
  const userExists = await req.db_context.exec("findUser", [email]);

  if (userExists != null) return responseHelper(res, 409, false, "User exists");

  /**
   * hash password
   */
  password = await hashPassword(password);

  /**
   * save user in db
   */
  const saveUser = await req.db_context.exec("UserSave", [
    firstname,
    lastname,
    email,
    password,
  ]);

  /**
   * return auth cookie
   */
  createAuthCookie(res, {
    firstname: firstname,
    lastname: lastname,
    email: email,
    userid: saveUser["userid"],
  });

  return responseHelper(res, 200, true, "Registered successfully");
});

module.exports = { registerUser };

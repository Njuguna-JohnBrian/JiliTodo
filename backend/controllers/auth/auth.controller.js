const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const {
  hashPassword,
  createAuthCookie,
  checkPassword,
} = require("../../helpers/auth.helper");
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

/**
 *
 * @type {function(*, *, *): Promise<Awaited<*>>}
 */
const loginUser = CatchAsyncErrors(async (req, res, next) => {
  let { email, password } = req.body;

  /**
   * check if user exists
   */
  const userExists = await req.db_context.search("Users", {
    email: email,
  });

  if (userExists === null)
    return responseHelper(
      res,
      404,
      false,
      "Email or password is wrong. Try again!",
    );

  /**
   * compare passwords
   */
  const isPassword = await checkPassword(password, userExists["passwordhash"]);

  if (!isPassword)
    return responseHelper(
      res,
      404,
      false,
      "Email or password is wrong. Try again!",
    );

  /**
   * return auth cookie
   */
  createAuthCookie(res, {
    firstname: userExists["firstname"],
    lastname: userExists["lastname"],
    email: userExists["email"],
    userid: userExists["userid"],
  });

  return responseHelper(res, 200, "Login was successful");
});

/**
 *
 * @type {function(*, *, *): Promise<Awaited<*>>}
 */
const logoutUser = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("cookie", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return responseHelper(res, 200, true, "Logout successful");
});
module.exports = { registerUser, loginUser, logoutUser };

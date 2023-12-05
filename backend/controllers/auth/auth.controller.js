const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const {
  hashPassword,
  createCookie,
  checkPassword,
} = require("../../helpers/auth.helper");
const { responseHelper } = require("../../helpers/responseHelper");
const { isEmpty } = require("lodash");
const ErrorHandler = require("../../helpers/errorHandler.helper");
/**
 *
 * @type {function(*, *, *): Promise<Awaited<*>>}
 */
const registerUser = CatchAsyncErrors(async (req, res, next) => {
  /**
   * destructure properties
   */
  let { firstname, lastname, email, password, roleid } = req.body;

  /**
   * check if user exists
   */
  const userExists = await req.db_context.exec("findUser", [email]);

  if (!isEmpty(userExists))
    return responseHelper(res, 409, false, "User exists");

  /**
   * check if role exists
   */
  const roleExists = await req.db_context.search("Roles", { roleid: roleid });

  if (isEmpty(roleExists))
    return next(new ErrorHandler("Role not found or does not exist", 404));

  if (roleExists.rolename === "admin") {
    return next(
      new ErrorHandler("Elevated permissions are needed for this action", 400),
    );
  }

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
    roleExists["id"],
    password,
  ]);

  if (isEmpty(saveUser))
    return next(new ErrorHandler("Registration failed. Please retry", 500));

  const updateData = {
    createdby: saveUser["id"],
  };

  await req.db_context.update("Users", { id: saveUser["id"] }, updateData);

  /**
   * return auth cookie
   */
  createCookie(res, {
    firstname: saveUser["firstname"],
    lastname: saveUser["lastname"],
    email: saveUser["email"],
    userid: saveUser["userid"],
    rolename: roleExists.rolename,
  });

  return responseHelper(res, 200, true, "Registered successfully");
});

/**
 *
 * @type {function(*, *, *): Promise<Awaited<*>>}
 */
const loginUser = CatchAsyncErrors(async (req, res) => {
  let { email, password } = req.body;

  /**
   * check if user exists
   */
  const userExists = await req.db_context.exec("findUser", [email]);

  if (isEmpty(userExists))
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
  createCookie(res, {
    firstname: userExists["firstName"],
    lastname: userExists["lastName"],
    email: userExists["email"],
    userid: userExists["userId"],
    rolename: userExists["rolename"],
  });

  return responseHelper(res, 200, "Login was successful");
});

/**
 *
 * @type {function(*, *, *): Promise<Awaited<*>>}
 */
const logoutUser = CatchAsyncErrors(async (req, res) => {
  res.cookie("cookie", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return responseHelper(res, 200, true, "Logout successful");
});
module.exports = { registerUser, loginUser, logoutUser };

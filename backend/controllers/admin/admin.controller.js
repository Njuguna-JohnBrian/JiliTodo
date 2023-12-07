const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { responseHelper } = require("../../helpers/responseHelper");
const { isEmpty } = require("lodash");
const ErrorHandler = require("../../helpers/errorHandler.helper");

const updateUserDetails = CatchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  const { userId } = req.params;

  if (isEmpty(firstname) && isEmpty(lastname) && isEmpty(email))
    return responseHelper(res, 204, true);

  const userExists = await req.db_context.search("Users", { userid: userId });

  if (isEmpty(userExists))
    return responseHelper(res, 200, true, "User not found or does not exist");

  if (!isEmpty(email)) {
    if (email !== userExists["email"]) {
      const emailIsTaken = await req.db_context.exec("emailIsTaken", [
        userId,
        email,
      ]);
      if (emailIsTaken)
        return responseHelper(
          res,
          200,
          true,
          "User not found or email is taken",
        );
    }
  }

  return responseHelper(res, 200, true, "User updated successfully");
});

module.exports = { updateUserDetails };

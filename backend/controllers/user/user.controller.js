const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { responseHelper } = require("../../helpers/responseHelper");
const { isEmpty } = require("lodash");
const ErrorHandler = require("../../helpers/errorHandler.helper");

const updateProfile = CatchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  const { userId } = req.params;

  const userExists = await req.db_context.search("Users", {
    userid: userId,
  });
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

  const updateData = {
    updateddtm: new Date().toISOString(),
    updatedby: userExists["id"],
    firstname: firstname ?? userExists["firstname"],
    lastname: lastname ?? userExists["lastname"],
    email: email ?? userExists["email"],
  };

  const data = await req.db_context.update(
    "Users",
    { id: userExists["id"] },
    updateData,
  );

  if (Number(data) !== 1)
    return next(new ErrorHandler("Profile update failed", 404));

  return responseHelper(res, 200, true, "Profile details updated");
});

module.exports = { updateProfile };

const { validationResult } = require("express-validator");
const { hashPassword, createAuthCookie } = require("../../helpers/auth");

const registerUser = async (req, res) => {
  try {
    /**
     * destructure properties
     */
    let { firstname, lastname, email, password, confirmPassword } = req.body;

    /**
     * validate properties
     * throw errors if present
     */
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors["errors"] });
    }

    /**
     * hash password
     */
    password = await hashPassword(password);

    createAuthCookie(res, 200, {
      firstname: firstname,
      lastname: lastname,
      email: email,
    });

    return res.status(200).json({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser };

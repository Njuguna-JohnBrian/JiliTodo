const { validationResult } = require("express-validator");

const registerUser = (req, res) => {
  try {
    /**
     * destructure properties
     */
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    /**
     * validate properties
     */
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors["errors"] });
    }

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

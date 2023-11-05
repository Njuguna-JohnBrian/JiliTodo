const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @param {string} rawPassword
 */
const hashPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, Number(process.env.PASSWORD_SALT_ROUNDS));
};

/**
 *
 * @param res
 * @param cookiePayload
 */
const createAuthCookie = (res, cookiePayload) => {
  const cookie = jwt.sign(cookiePayload, process.env.JWT_SECRET, {
    expiresIn: process.env.COOKIE_EXPIRES_TIME,
  });

  res.cookie("cookie", cookie, {
    expires: new Date(Date.now() + Number(10) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
};

module.exports = { hashPassword, createAuthCookie };

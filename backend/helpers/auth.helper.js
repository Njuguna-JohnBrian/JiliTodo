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
 * @param submittedPassword
 * @param dbPasswordHash
 * @returns {*}
 */
const checkPassword = (submittedPassword, dbPasswordHash) => {
  return bcrypt.compareSync(submittedPassword, dbPasswordHash);
};

/**
 *
 * @param res
 * @param cookiePayload
 * @param isAuthCookie
 */
const createCookie = (res, cookiePayload, isAuthCookie = true) => {
  const cookie = jwt.sign(cookiePayload, process.env.JWT_SECRET, {
    expiresIn: process.env.COOKIE_EXPIRES_TIME,
  });

  if (isAuthCookie) {
    res.cookie("cookie", cookie, {
      expires: new Date(Date.now() + Number(10) * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
  } else {
    return cookie;
  }
};

module.exports = { hashPassword, createCookie, checkPassword };

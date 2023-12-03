const bcrypt = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");

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
  const cookie = sign(cookiePayload, process.env.JWT_SECRET, {
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

const verifyToken = (userToken) => {
  if (typeof verify(userToken, process.env.JWT_SECRET) == "object") {
    if (Date.now() >= verify(userToken, process.env.JWT_SECRET).exp * 1000) {
      throw Error("TokenExpiredError");
    } else {
      return verify(userToken, process.env.JWT_SECRET);
    }
  }
};

module.exports = {
  hashPassword,
  createCookie,
  checkPassword,
  verifyToken,
};

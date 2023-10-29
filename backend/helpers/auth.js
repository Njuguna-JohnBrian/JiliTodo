const bcrypt = require("bcryptjs");

const hashPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, Number(process.env.PASSWORD_SALT_ROUNDS));
};

module.exports = { hashPassword };

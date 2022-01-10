const bcrypt = require("bcrypt");
const saltRounds = 12;

const createHash = (password) => {
  const passwordCripted = bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(saltRounds),
    null
  );
  return passwordCripted;
};

const isValidPassword = (user, password) => {
  const isValid = bcrypt.compareSync(user, password);
  return isValid;
};

module.exports = { createHash, isValidPassword };

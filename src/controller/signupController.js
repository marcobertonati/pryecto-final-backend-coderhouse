const prefixService = require("../services/prefixNumberService");

exports.signUp = async (req, res, next) => {
  const prefixNumber = await prefixService();
  res.render("./pages/signup", { prefixNumber, layout: "login-signup.hbs" });
};

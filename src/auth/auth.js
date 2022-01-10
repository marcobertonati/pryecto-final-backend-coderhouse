const auth = function (req, res, next) {
  if (!req.session.user) {
    console.log(
      "AUTH: Se negó acceso ya que no hay sesión. Se redirecciona a /login."
    );
    return res.redirect("/login");
  }
  const user = req.session.user.username;
  console.log("AUTH: Hay sesión.");
  console.log(`El usuario ${user} ingresó a /welcome.`);
  next();
};
module.exports = { auth };

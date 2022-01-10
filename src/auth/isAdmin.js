exports.isAdmin = (req, res, next) => {
  if (req.session.passport.user.admin) {
    console.log("Es Admin");
    next();
  } else {
    res.status(401).redirect("/welcome");
  }
};

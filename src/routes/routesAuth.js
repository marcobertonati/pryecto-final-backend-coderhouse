/* Rutas de Autenticación, Autorización y Registro */

/* Requiero controladores de ruta */
const {
  signUpLocal,
  signUpLocalCallback,
  logIn,
  logInCallback,
  logOut,
  logInFacebook,
  logInCallbackFacebook,
} = require("../controller/authController");

/*Requiero el controlador de autenticación por si la persona quiere loguearse vía Facebook: Funcionalidad pausada ya que estamos manejando vía PassportLocal */
const passportFacebook = require("../auth/authPassportFacebook");

module.exports = (router) => {
  router
    /*Rutas para passportLocal */
    // Rutas de registro
    .post("/api/signup", signUpLocal, signUpLocalCallback)
    .get("/failsignup", (req, res, next) => {
      res.status(400).redirect("/error-signup");
    })
    // Rutas de login
    .post("/api/login", logIn, logInCallback)
    .get("/faillogin", (req, res, next) => {
      res.status(400).redirect("/error-login");
    })
    //Rutas para deslogueo
    .post("/api/logout", logOut)

    /*------------------------ */
    /*Rutas para passportFacebook: Funcionalidad pausada ya que estamos usando Passport Local */
    .get("/auth/facebook", logInFacebook)
    .get(
      "/auth/facebook/callback",
      passportFacebook.authenticate("facebook", {
        failureRedirect: "/login",
      }),
      logInCallbackFacebook
    );

  return router;
};

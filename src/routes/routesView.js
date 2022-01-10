/*Controladores de Auth para proteger views */
const { checkAuthentication } = require("../auth/checkAuth");
const { isAdmin } = require("../auth/isAdmin");

/*Controladores de Productos */
const { productController } = require("../controller");

/*Controladores de Mensajes de chat */
const chatController = require("../controller/messagesChat");

/*Controlador carrito */
const cartController = require("../controller/cartController");

/*Controlador signup*/
const signUpController = require("../controller/signupController");

module.exports = (router) => {
  router
    /*Ruta por defecto si no está logueado */
    .get("/", checkAuthentication, (req, res, next) => {
      res.redirect("/productos/vista");
    })

    /*Vistas de productos */
    .get("/productos/vista", checkAuthentication, productController.findAll)
    .get("/productos/agregar", checkAuthentication, (req, res, next) => {
      res.render("./pages/agregar");
    })
    .get(
      "/productos/:category",
      checkAuthentication,
      productController.getByCategory
    )
    .get(
      "/productos/detalle/:id",
      checkAuthentication,
      productController.getOne
    )

    /*Vistas de busquedad de productos por precio: Funcionalidad en desarrollo */
    .get("/buscar/precio?", checkAuthentication, productController.getByPrice)

    /*Vistas de carrito */
    .get("/carrito/vista", checkAuthentication, cartController.getCartSession)
    .get("/purchase-completed", (req, res, next) => {
      res.render("./pages/purchase-completed");
    })

    /*Vistas de chat */
    .get("/chat-view", checkAuthentication, chatController.getAllMsgChat)
    .get("/chat/:email", checkAuthentication, chatController.getMsgByEmail)

    /*Vistas de autenticación */
    .get("/login", (req, res, next) => {
      res.render("./pages/login", { layout: "login-signup.hbs" });
    })
    .get("/signup", signUpController.signUp)

    /*Vistas de perfil y goodbye */
    .get("/welcome", checkAuthentication, (req, res, next) => {
      const data = req.session.passport;
      res.render("./pages/welcome", { data });
    })
    .get("/goodbye", (req, res, next) => {
      res.render("./pages/goodbye");
    })

    /*Vista de errores */
    .get("/error-login", (req, res, next) => {
      res.render("./pages/error-login");
    })
    .get("/error-signup", (req, res, next) => {
      res.render("./pages/error-signup");
    })

    /*Vista de configuración del servidor */
    .get("/server-config", isAdmin, (req, res, next) => {
      const {
        MONGO_URI,
        PORT,
        PERSISTENCE,
        EXPIRATION_SESSION,
        GMAIL_USER,
        GMAIL_USER_PASS,
      } = require("../config/globals");
      const data = {
        mongoUri: MONGO_URI,
        port: PORT,
        persistence: PERSISTENCE,
        expirationSession: EXPIRATION_SESSION,
        gmailUser: GMAIL_USER,
        gmailPass: GMAIL_USER_PASS,
      };

      res.status(200).render("./pages/server-config", {
        layout: "server-config.hbs",
        data,
      });
    });
  return router;
};

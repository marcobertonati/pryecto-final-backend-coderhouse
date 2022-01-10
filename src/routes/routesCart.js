/*Requiero controladores de productos */
/* El carrito es controlado solo a través de la session */
const cartController = require("../controller/cartController");

module.exports = (router) => {
  router

    .post("/api/cart/post-session", cartController.postCartSession)
    .get("/api/cart/get-session", cartController.getCartSession);

  return router;
};

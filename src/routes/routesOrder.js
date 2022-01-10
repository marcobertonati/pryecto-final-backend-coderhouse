const { orderController } = require("../controller");

module.exports = (router) => {
  router
    .post("/api/order/create", orderController.createOrder)
    .get("/api/order/", orderController.getAllOrder);

  return router;
};

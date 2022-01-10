const { orderController } = require("../controller");

module.exports = (router) => {
  router
    .post("/api/order/create", orderController.cr.eateOrder)
    .get("/api/order/", orderController.getAllOrder);

  return router;
};

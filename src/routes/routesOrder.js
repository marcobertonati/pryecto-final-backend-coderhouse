const { orderController } = require("../controller");

module.exports = (router) => {
  router
    .post("/api/order/create", orderController.createOrder)
    .get("/api/order/", orderController.getAllOrder)
    .get("/api/order/id/:id", orderController.getOneOrder)
    .delete("/api/order/id/:id", orderController.deleteOneOrder)
    .patch("/api/order/id/:id", orderController.updateOneOrder); // No tendría sentido modificar una orden ya que está generada. 

  return router;
};

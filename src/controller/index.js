const { productService } = require("../services");
const productController = require("./productController");

const orderController = require("./orderController");
const { orderService } = require("../services");

module.exports = {
  productController: productController(productService),
  orderController: orderController(orderService),
};

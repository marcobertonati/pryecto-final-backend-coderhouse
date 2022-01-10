const ProductService = require("./productService");
const OrderService = require("./orderService");

module.exports = {
  productService: new ProductService(),
  orderService: new OrderService()
};

const ProductService = require("./productService");
const OrderService = require("./orderService");
const UserService = require('./userService')

module.exports = {
  productService: new ProductService(),
  orderService: new OrderService(),
  userService: new UserService(),
};

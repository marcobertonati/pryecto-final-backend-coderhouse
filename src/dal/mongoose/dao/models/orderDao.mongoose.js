const { cartModel } = require("../../schemas/cartMongoose");

module.exports = class {
  constructor() {
    this.orders = cartModel;
  }

  async create(order) {
    try {
      return this.orders.create(order);
    } catch (error) {
      console.log(error);
    }
  }

  async find() {
    try {
      return await this.orders.find();
    } catch (error) {
      console.log(erro);
    }
  }
};

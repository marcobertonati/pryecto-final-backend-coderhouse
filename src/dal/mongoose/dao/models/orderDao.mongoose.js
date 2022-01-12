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
      console.log(error);
    }
  }

  async findById(id) {
    try {
      const response = await this.orders.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.orders.findByIdAndRemove(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, payload) {
    try {
      const response = await this.orders.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

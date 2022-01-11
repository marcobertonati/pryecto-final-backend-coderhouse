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
      const errorMsg = {
        message: `No se pudo crear orden`,
        orderCreated: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async find() {
    try {
      return await this.orders.find();
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se encontraron ordenes.`,
        orderFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async findById(id) {
    try {
      const response = await this.orders.findById(id);
      return response;
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se encontró orden con id ${id}.`,
        orderFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.orders.findByIdAndRemove(id);
      return response;
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se encontró orden con id ${id}.`,
        orderDeleted: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }
};

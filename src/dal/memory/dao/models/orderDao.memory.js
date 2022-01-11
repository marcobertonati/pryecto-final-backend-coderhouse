const mockOrder = require("../../../../../__test__/mock/orders.mock");

module.exports = class {
  constructor() {
    this.orders = mockOrder;
  }

  async create(order) {
    try {
      await this.orders.push(order);
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
      const response = await this.orders;
      return response;
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
      const [response] = await this.orders.filter((order) => order._id == id);
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
      const response = await this.orders.filter((order) => order._id != id);
      this.orders = response;
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

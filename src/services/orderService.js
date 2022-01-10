const { PERSISTENCE } = require("../config/globals");
const persistenceFactory = require("../dal/factory");
let { persistenceOrder } = persistenceFactory.newPersistence(PERSISTENCE);

module.exports = class {
  constructor() {
    this.orderModel = persistenceOrder;
  }

  async createOrder(order) {
    try {
      return await this.orderModel.create(order);
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se creo orden.`,
        orderCreated: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async getAllOrders() {
    try {
      return await this.orderModel.find();
    } catch (error) {
      const errorMsg = {
        message: `No se encontró ordenes.`,
        orderFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }
};

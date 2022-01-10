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
    }
  }

  async find() {
    try {
      const response = await this.orders;
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

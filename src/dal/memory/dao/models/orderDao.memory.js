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

  async findById(id) {
    try {
      const [response] = await this.orders.filter((order) => order._id == id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.orders.filter((order) => order._id != id);
      this.orders = response;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, payload) {
    try {
      // working!
    } catch (error) {
      console.log(error);
    }
  }
};

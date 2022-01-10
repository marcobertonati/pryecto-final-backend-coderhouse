const { userModel } = require("../../schemas/userMongoose");

module.exports = class {
  constructor() {
    this.user = userModel;
  }

  async findUserByEmail(email) {
    try {
      return await this.user.findOne({ email: email.email });
    } catch (error) {
      console.log(error);
    }
  }

  async findUserById(id) {
    try {
      return await this.user.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(userToCreate) {
    try {
      return await this.user.create(userToCreate);
    } catch (error) {
      console.log(error);
    }
  }
};

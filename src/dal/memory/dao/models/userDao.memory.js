const userModel = require("../../../../../__test__/mock/user.mock");

module.exports = class {
  constructor() {
    this.users = userModel;
  }

  async findUserByEmail({ email }) {
    try {
      const [result] = await this.users.filter((user) => user.email == email);
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserById(id) {
    try {
      const result = await this.users.filter((user) => user._id == id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(userToCreate) {
    try {
      return await this.users.push(userToCreate);
    } catch (error) {
      console.log(error);
    }
  }
};

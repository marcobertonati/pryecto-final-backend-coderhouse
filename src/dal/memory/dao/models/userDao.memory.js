const userModel = require("../../../../../__test__/mock/user.mock");

module.exports = class {
  constructor() {
    this.users = userModel;
  }

  async findUsers() {
    try {
      const response = await this.users;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByEmail(email) {
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
      const [result] = await this.users.filter((user) => user._id == id);
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

  async deleteUserById(id) {
    try {
      const response = await this.users.filter((user) => user._id != id);
      console.log(response);
      this.users = response;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserById(id, payload) {
    try {
      const userFinded = this.users.findIndex((user) => user._id == id);

      if (userFinded > -1) {
        this.users[userFinded].name =
          payload.name == undefined
            ? this.users[userFinded].name
            : payload.name;
        this.users[userFinded].lastname =
          payload.lastname == undefined
            ? this.users[userFinded].lastname
            : payload.lastname;
        this.users[userFinded].age =
          payload.age == undefined ? this.users[userFinded].age : payload.age;
        this.users[userFinded].number =
          payload.number == undefined
            ? this.users[userFinded].number
            : payload.number;
        this.users[userFinded].address =
          payload.address == undefined
            ? this.users[userFinded].address
            : payload.address;
        this.users[userFinded].email =
          payload.email == undefined
            ? this.users[userFinded].email
            : payload.email;
        this.users[userFinded].avatar =
          payload.avatar == undefined
            ? this.users[userFinded].avatar
            : payload.avatar;
        this.users[userFinded].password =
          payload.password == undefined
            ? this.users[userFinded].password
            : payload.password;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const { PERSISTENCE } = require("../config/globals");
const persistenceFactory = require("../dal/factory");
const { persistenceUser } = persistenceFactory.newPersistence(PERSISTENCE);

module.exports = class {
  constructor() {
    this.userModel = persistenceUser;
  }

  async createUser(user) {
    try {
      return await this.userModel.createUser(user);
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se creo usuario.`,
        userCreated: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async findUsers() {
    try {
      return await this.userModel.findUsers();
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se encontraron usuarios.`,
        userFounded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async findUserById(id) {
    try {
      return await this.userModel.findUserById(id);
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se encontró usuario con id ${id}.`,
        userFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async deleteUserById(id) {
    try {
      return await this.userModel.deleteUserById(id);
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se creo borro usuario con id ${id}.`,
        userDeleted: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async updateUserById(id, payload) {
    try {
      return await this.userModel.updateUserById(id, payload);
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se actualizó usuario con id ${id}.`,
        userUpdated: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async findUserByEmail(email) {
    try {
      return await this.userModel.findUserByEmail(email);
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `No se encontró usuario con email ${email}.`,
        userFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async addCartToUser(id, cart) {
    await userModel.updateOne(id, {
      $push: { carts: cart },
    });
  }
};

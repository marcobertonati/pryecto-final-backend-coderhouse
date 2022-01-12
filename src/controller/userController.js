const { createHash } = require("../auth/bcrypt/bcrypt");

const userController = (service) => {
  return {
    createUser: async (req, res, next) => {
      try {
        const userToCreate = {
          name: req.body.name,
          lastname: req.body.lastname,
          age: req.body.age,
          number: req.body.number,
          address: req.body.address,
          email: req.body.email,
          avatar: `/static/avatar/${req.file.filename}`,
          password: createHash(req.body.password),
        };

        await service.createUser(userToCreate);
        res.status(200).json({ message: "usuario creado" });
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se creo usuario.`,
          userCreated: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    findUsers: async (req, res, next) => {
      try {
        const response = await service.findUsers();
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se encontraron usuarios.`,
          userFounded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    findUserById: async (req, res, next) => {
      try {
        const { id } = req.params;
        const response = await service.findUserById(id);
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se encontró usuario con id ${id}.`,
          userFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    deleteUserById: async (req, res, next) => {
      try {
        const { id } = req.params;
        await service.deleteUserById(id);
        res.status(200).json({ msg: `Usuario ${id} borrado.` });
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se borro usuario con id ${id}.`,
          userDeleted: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    updateUserById: async (req, res, next) => {
      try {
        const { id } = req.params;
        const { body } = req;
        await service.updateUserById(id, body);
        res.status(200).json({ msg: `Usuario ${id} actualizado` });
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se actualizó usuario con id ${id}.`,
          userUpdated: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    findUserByEmail: async (req, res, next) => {
      try {
        const { email } = req.params;
        const response = await service.findUserByEmail(email);
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se encontró usuario con email ${email}.`,
          userFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    // addCartToUser: async (id, cart) => {
    //     await userModel.updateOne(id, {
    //       $push: { carts: cart },
    //     });
    //   }
  };
};

module.exports = userController;

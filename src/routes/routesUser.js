/*Requiero controladores de productos */
const { userController } = require("../controller");

module.exports = (router) => {
  router
    .post("/api/user/create", userController.createUser)
    .get("/api/user/", userController.findUsers)
    .get("/api/user/:id", userController.findUserById)
    .get("/api/user/email/:email", userController.findUserByEmail)
    .delete("/api/user/:id", userController.deleteUserById)
    .patch("/api/user/:id", userController.updateUserById)

  return router;
};
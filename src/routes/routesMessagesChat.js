/*Requiero controladores de messages */
/*La ruta de MessagesChat es solo de prueba de fucionamiento, ya qe todo el chat de maneja desde socket.io: \src\services\messagesIOchat.js */
const messagesController = require("../controller/messagesChat");
module.exports = (router) => {
  router
    .get("/api/message/list", messagesController.getAllMsgChat)
    .post("/api/message/create", messagesController.createMsg);
  return router;
};

const express = require("express");
/*Router */
/*Requerimos las rutas que va a ofrecer nuestra aplicación */
const routesProducts = require("./routesProducts");
const routerProducts = express.Router();
const routesCart = require("./routesCart");
const routerCart = express.Router();
const routesOrder = require("./routesOrder");
const routerOrder = express.Router();
const routesMessagesChat = require("./routesMessagesChat");
const routerMessagesChat = express.Router();
const routesAuth = require("./routesAuth");
const routerAuth = express.Router();
const routesProcessInfo = require("./routesProcessInfo");
const routerProcessInfo = express.Router();

/*Rutas a las view */
const routesView = require("./routesView");
const routerViews = express.Router();

module.exports = routesConfig = (app) => {
  app.use(routesProducts(routerProducts));
  app.use(routesCart(routerCart));
  app.use(routesOrder(routerOrder));
  app.use(routesAuth(routerAuth));
  app.use(routesView(routerViews));
  app.use(routesProcessInfo(routerProcessInfo));

  /*La ruta de MessagesChat es solo de prueba de fucionamiento, ya qe todo el chat de maneja desde socket.io: \src\services\messagesIOchat.js */
  app.use(routesMessagesChat(routerMessagesChat));
};

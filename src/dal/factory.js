class PersistenceFactory {
  newPersistence = (type) => {
    switch (type) {

      
      /* PERSISTENCIA EN MEMORIA */
      case "memory":
        console.log("[Persistence] : Memory");
        const persistenceMemoryProduct = require("../dal/memory/dao/models/productDao.memory");
        const persistenceMemoryUser = require("../dal/memory/dao/models/userDao.memory");
        const persistenceMemoryOrder = require("../dal/memory/dao/models/orderDao.memory");
        const {
          messagesRepository,
        } = require("../dal/memory/repositories/index");

        return {
          persistenceProduct: new persistenceMemoryProduct(),
          persistenceUser: new persistenceMemoryUser(),
          persistenceOrder: new persistenceMemoryOrder(),
          persistenceMessages: messagesRepository,
        };


      /* PERSISTENCIA EN MONGO DB */
      case "mongodb":
        console.log("[Persistence] : MongoDB");
        const persistenceMongoDBProduct = require("../dal/mongoose/dao/models/productDao.mongoose");
        const persistenceMongoDBUser = require("../dal/mongoose/dao/models/userDao.mongoose");
        const persistenceMongoDBOrder = require("../dal/mongoose/dao/models/orderDao.mongoose");
        const {
          messagesRepositoryMoongose,
        } = require("../dal/mongoose/repositories/index");

        return {
          persistenceProduct: new persistenceMongoDBProduct(),
          persistenceUser: new persistenceMongoDBUser(),
          persistenceOrder: new persistenceMongoDBOrder(),
          persistenceMessages: messagesRepositoryMoongose,
        };


      /* PERSISTENCIA EN DEFAULT: MEMORIA */
      default:
        console.log("[Persistence] : Default => Memory");
        const persistenceDefaultProduct = require("../dal/memory/dao/models/productDao.memory");
        const persistenceDefaultUser = require("../dal/memory/dao/models/userDao.memory");
        const messagesRepositoryIndex = require("../dal/memory/repositories/index");
        const persistenceDefaultOrder = require("../dal/memory/dao/models/orderDao.memory");

        return {
          persistenceProduct: new persistenceDefaultProduct(),
          persistenceUser: new persistenceDefaultUser(),
          persistenceMessages: messagesRepositoryIndex.messagesRepository,
          persistenceOrder: new persistenceDefaultOrder(),
        };
    }
  };
}

module.exports = new PersistenceFactory();

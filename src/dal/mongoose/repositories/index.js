const ModelMessagesMongoose = require("../schemas/messagesMongoose");
const MessageRepository = require("./messageRepository");

module.exports = {
  messagesRepositoryMoongose: new MessageRepository(ModelMessagesMongoose),
};

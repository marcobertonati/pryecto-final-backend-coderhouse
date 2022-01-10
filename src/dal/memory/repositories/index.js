const chatMessagesMock = require("../../../../__test__/mock/chatMessages.mock");
const MessageRepository = require("./messageRepository");

module.exports = {
  messagesRepository: new MessageRepository(chatMessagesMock),
};

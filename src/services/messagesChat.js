const messagesChat = require("../dal/mongoose/schemas/messagesMongoose");

module.exports = class {
  async createMessage(msg) {
    try {
      await messagesChat.create(msg);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllMessage() {
    try {
      const allMessage = await messagesChat.find().lean();
      return allMessage;
    } catch (error) {
      console.log(error);
    }
  }
};

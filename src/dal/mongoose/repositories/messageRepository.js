const BaseRepository = require("./baseRepository");

class MessageRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async getAllMsg() {
    try {
      const messages = await this.model.find().lean();
      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  async getMsgByEmail(email) {
    try {
      const response = await this.model.find({ "author.id": email });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MessageRepository;

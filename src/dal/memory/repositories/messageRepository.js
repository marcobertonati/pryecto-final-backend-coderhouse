const BaseRepository = require("./baseRepository");

class MessageRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async getAllMsg() {
    try {
      const messages = await this.model;
      return messages;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MessageRepository;

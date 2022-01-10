class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const elements = await this.model;
      return elements;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const element = await this.model.filter((element) => element._id == id);
      return element;
    } catch (error) {
      console.log(error);
    }
  }

  async create(element) {
    try {
      const elementCreated = await this.model.push(element);
      return elementCreated;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const elementDeleted = await this.model.filter(
        (element) => element._id != id
      );
      return elementDeleted;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload) {
    try {
      const msgFinded = this.model.findIndex((element) => element._id == id);
      if (msgFinded < -1) {
        return { msg: "No se encontró chat" };
      }

      this.model[msgFinded] = {
        text: payload,
      };

      return this.model[msgFinded];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BaseRepository;

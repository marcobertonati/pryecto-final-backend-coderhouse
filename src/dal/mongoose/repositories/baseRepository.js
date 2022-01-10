class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const elements = await this.model.find();
      return elements;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const element = await this.model.findById(id);
      return element;
    } catch (error) {
      console.log(error);
    }
  }

  async create(element) {
    try {
      const elementCreated = await this.model.create(element);
      return elementCreated;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const elementDeleted = await this.model.findByIdAndDelete(id);
      return elementDeleted;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload) {
    try {
      const elementUpdated = await this.model.findByIdAndUpdate(id, payload);
      return elementUpdated;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BaseRepository;

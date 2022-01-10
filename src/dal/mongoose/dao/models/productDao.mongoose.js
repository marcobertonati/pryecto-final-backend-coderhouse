const { productModelMongoose } = require("../../schemas/productsMongoose");
const DTOmongoose = require("../../dto/dto.mongoose");
/*Creo que en este constructor deberia hacer la conexión a la base de datos*/

module.exports = class {
  constructor() {
    this.products = productModelMongoose;
  }

  async create(product) {
    try {
      return this.products.create(product);
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id) {
    try {
      const result = await this.products.findById(id);
      const productsDTOmongoose = DTOmongoose.geyById(result);
      return productsDTOmongoose;
    } catch (error) {
      console.log(error);
    }
  }

  async find() {
    try {
      const result = await this.products.find();
      const productsDTOmemory = DTOmongoose.getAllProducts(result);
      return productsDTOmemory;
    } catch (error) {
      console.log(error);
    }
  }

  async findByIdAndUpdate(id, productUpdated) {
    try {
      return this.products.findByIdAndUpdate(id, productUpdated, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async findByIdAndDelete(id) {
    try {
      return this.products.findOneAndDelete({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async findByCategory(category) {
    try {
      const response = await this.products.find({ category: category }).lean();
      const result = DTOmongoose.getAllProducts(response);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByTitle(title) {
    try {
      return await this.products.find({ title: title });
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByCode(code) {
    try {
      return await this.products.find({ code: code });
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByPrice(pricemin, pricemax) {
    try {
      return await this.products
        .find({
          $and: [{ price: { $gte: pricemin } }, { price: { $lte: pricemax } }],
        })
        .lean();
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByStock(stockmin, stockmax) {
    try {
      return await this.products.find({
        $and: [{ stock: { $gte: stockmin } }, { stock: { $lte: stockmax } }],
      });
    } catch (error) {
      console.log(error);
    }
  }
};

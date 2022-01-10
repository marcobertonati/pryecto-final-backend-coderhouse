const { productModel } = require("../../dal/mongoose/schemas/productsMongoose");

const root = {
  products: async () => {
    try {
      const response = await productModel.find();
      return response;
    } catch (error) {
      throw error;
    }
  },
  product: async ({ _id }) => {
    try {
      const response = await productModel.findById(_id);
      return response;
    } catch (error) {
      throw error;
    }
  },
  createProduct: async (product) => {
    try {
      console.log(product);
      const response = await productModel.create(product);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = root;

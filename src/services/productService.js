/* PERSISTENCE: dependiendo de como se inicie el servidor tomará: mongoDB o memory */

const { PERSISTENCE } = require("../config/globals");
const persistenceFactory = require("../dal/factory");
let { persistenceProduct } = persistenceFactory.newPersistence(PERSISTENCE);

module.exports = class {
  constructor() {
    this.productModel = persistenceProduct;
  }
  async createProduct(product) {
    try {
      return await this.productModel.create(product);
    } catch (error) {
      const errorMsg = {
        message: "No se cargó producto",
        productCreated: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async getProduct(id) {
    try {
      const data = await this.productModel.findById(id);
      return data;
    } catch (error) {
      const errorMsg = {
        message: `No se encontró producto con id ${id}`,
        productFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async getAllProducts() {
    try {
      return await this.productModel.find();
    } catch (error) {
      const errorMsg = {
        message: "No se encontraron productos",
        productsFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async updateProduct(id, productUpdated) {
    try {
      return await this.productModel.findByIdAndUpdate(id, productUpdated);
    } catch (error) {
      const errorMsg = {
        message: "No se pudo modificar producto",
        productModify: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async deleteProduct(id) {
    try {
      return await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      const errorMsg = {
        message: "No se pudo borrar producto",
        productsFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async getByCategory(category) {
    try {
      return await this.productModel.findByCategory(category);
    } catch (error) {
      const errorMsg = {
        message: `No se encontraron productos con la categoria ${category}`,
        productsFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  /* Los siguientes métodos no tienen un uso real en el cliente */

  async getProductByTitle(title) {
    try {
      return await this.productModel.getProductByTitle(title);
    } catch (error) {
      const errorMsg = {
        message: `No se encontraron productos con el título ${title}`,
        productsFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async getProductByCode(code) {
    try {
      return await this.productModel.getProductByCode(code);
    } catch (error) {
      const errorMsg = {
        message: `No se encontraron productos con code ${code}`,
        productsFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async getProductByPrice(pricemin, pricemax) {
    try {
      return await this.productModel.getProductByPrice(pricemin, pricemax);
    } catch (error) {
      const errorMsg = {
        message: `No se encontraron productos con ese rango de valores`,
        productsFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }

  async getProductByStock(stockmin, stockmax) {
    try {
      return await this.productModel.find(stockmin, stockmax);
    } catch (error) {
      const errorMsg = {
        message: `No se encontraron productos con ese rango de stock`,
        productsFinded: false,
        error: error,
      };
      res.status(400).json(errorMsg);
    }
  }
};

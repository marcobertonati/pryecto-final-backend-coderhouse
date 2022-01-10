const mockProduct = require("../../../../../__test__/mock/products.mock.js");
const DTO = require("../../dto/dto.memory");
const DTOmemory = new DTO();

module.exports = class {
  constructor() {
    this.products = mockProduct;
  }

  async create(product) {
    try {
      await this.products.push(product);
      const productsDTOmemory = new DTOmemory(product);
      return productsDTOmemory;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id) {
    try {
      const [result] = this.products.filter((product) => product.id == id);
      console.log(result);
      const productsDTOmemory = DTOmemory.geyById(result);
      return await productsDTOmemory;
    } catch (error) {
      console.log(error);
    }
  }

  async find() {
    try {
      const result = await this.products;
      const productsDTOmemory = DTOmemory.getAllProducts(result);
      return productsDTOmemory;
    } catch (error) {
      console.log(error);
    }
  }

  async findByIdAndUpdate(id, productUpdated) {
    try {
      const newArray = [...this.products]; // Copiamos el array
      const productFinded = this.products.findIndex(
        (product) => product._id === id
      ); // Encontramos el índice del producto
      newArray[productFinded] = {
        _id: this.products[productFinded]._id,
        title: productUpdated.title
          ? productUpdated.title
          : this.products[productFinded].title,
        price: productUpdated.price
          ? productUpdated.price
          : this.products[productFinded].price,
        thumbnail: productUpdated.thumbnail
          ? productUpdated.thumbnail
          : this.products[productFinded].thumbnail,
        timestamp: productUpdated.timestamp
          ? productUpdated.timestamp
          : this.products[productFinded].timestamp,
        description: productUpdated.description
          ? productUpdated.description
          : this.products[productFinded].description,
        code: productUpdated.code
          ? productUpdated.code
          : this.products[productFinded].code,
        stock: productUpdated.stock
          ? productUpdated.stock
          : this.products[productFinded].stock,
        __v: productUpdated.__v
          ? productUpdated.__v
          : this.products[productFinded].__v,
      }; // Modificamos el producto
      this.products = newArray;
      const productsDTOmemory = new DTOmemory(this.products);
      return productsDTOmemory.data[productFinded];
    } catch (error) {
      console.log(error);
    }
  }

  async findByIdAndDelete(id) {
    try {
      const results = this.products.filter((product) => product.id !== id);
      const productsDTOmemory = new DTOmemory(results);
      await productsDTOmemory.data;
    } catch (error) {
      console.log(error);
    }
  }

  async findByCategory(category) {
    try {
      const response = await this.products.filter(
        (product) => product.category === category
      );
      const result = DTOmemory.getAllProducts(response);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /*Estos metodos están en desarrollo ya que no tiene ninguna aplicación práctica para el cliente */
  //   async getProductByTitle(title) {
  //     console.log("Ingresó a productService => getProductByTitle");
  //     return await productModel.find({ title: title });
  //   }

  //   async getProductByCode(code) {
  //     console.log("Ingresó a productService => getProductByCode");
  //     return await productModel.find({ code: code });
  //   }

  //   async getProductByPrice(pricemin, pricemax) {
  //     return await productModel
  //       .find({
  //         $and: [{ price: { $gte: pricemin } }, { price: { $lte: pricemax } }],
  //       })
  //       .lean();
  //   }

  //   async getProductByStock(stockmin, stockmax) {
  //     console.log("Ingresó a productService => getProductByStock");
  //     return await productModel.find({
  //       $and: [{ stock: { $gte: stockmin } }, { stock: { $lte: stockmax } }],
  //     });
  //   }
};

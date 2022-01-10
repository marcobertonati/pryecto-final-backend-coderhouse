class DTOmemory {
  constructor(data) {
    this.data = data;
    this.id = process.pid + String(new Date().getMilliseconds());
    this.FyH = new Date().toISOString();
  }

  getAllProducts(data) {
    const productArray = data.map((e) => {
      return {
        id: e.id,
        title: e.title,
        price: e.price,
        thumbnail: e.thumbnail,
        timestamp: e.timestamp,
        description: e.description,
        code: e.code,
        category: e.category,
        stock: e.stock,
      };
    });
    return productArray;
  }

  geyById(data) {
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
      timestamp: data.timestamp,
      description: data.description,
      code: data.code,
      category: data.category,
      stock: data.stock,
    };
  }
}

module.exports = DTOmemory;

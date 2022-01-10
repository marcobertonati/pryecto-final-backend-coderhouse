const { Schema, model } = require("mongoose");

// Estructura del documento en MongoDB a través de Mongoose
const productSchema = new Schema({
  title: { type: String, required: true, max: 40 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  timestamp: { type: String, required: true, max: 40 },
  description: { type: String, required: true, max: 255 },
  code: { type: String, required: true, max: 40 },
  category: {type: String, required: true, max: 40},
  stock: { type: Number, required: true },
});

const productModelMongoose = model("Product", productSchema);
module.exports = { productModelMongoose, productSchema };


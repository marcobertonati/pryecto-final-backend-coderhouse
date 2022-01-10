const { Schema, model } = require("mongoose");
const { productSchema } = require("./productsMongoose");

const productOnCartSchema = new Schema({
  product: productSchema,
  quantity: { type: Number, default: 0 },
});

// Estructura del documento en MongoDB a través de Mongoose
const cartSchema = new Schema({
  /* COMO ESTÁ DEBAJO FUNCIONA, PERO FALTARIA LA CANTIDAD */
  // product: [productSchema]

  /* ASIQUE PROBAMOS HACERLO ASI */
  productsOnCart: [productOnCartSchema],
  orderNumber: { type: Number, required: true },
  timestamp: { type: Date, default: new Date() },
  state: { type: String, required: true },
  email: { type: String, required: true, max: 40 },
});

const cartModel = model("Orders", cartSchema);

module.exports = { cartModel, cartSchema };

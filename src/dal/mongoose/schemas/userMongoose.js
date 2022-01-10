const { Schema, model } = require("mongoose");

const { cartSchema } = require("./cartMongoose");

// Estructura del documento en MongoDB a través de Mongoose
const userSchema = new Schema({
  admin: { type: Boolean, require: true, default: false},
  name: { type: String, required: true, max: 40 },
  lastname: { type: String, required: true, max: 40 },
  age: { type: String, required: true, max: 40 },
  number: { type: String, required: true, max: 40 },
  address: { type: String, required: true, max: 40 },
  email: { type: String, required: true, max: 40 },
  avatar: { type: String, required: true, max: 40 },
  password: { type: String, required: true, max: 40 },
  carts: [cartSchema],
});

const userModel = model("Users", userSchema);



module.exports = { userModel };

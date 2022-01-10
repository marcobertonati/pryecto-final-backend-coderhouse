const { Schema, model } = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

// Estructura del documento en MongoDB a través de Mongoose
const userFBSchema = new Schema({
    id_facebook: { type: String },
    firstName: { type: String },
    lastName : { type: String },
    email: { type: String },
    photo: { type: String }


})

userFBSchema.plugin(findOrCreate);

const userFacebookModel = model('UsersFacebook', userFBSchema);

module.exports = userFacebookModel;
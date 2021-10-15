const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UsuarioSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  operador: { type: Boolean, require: true },
});

module.exports = model("Usuario", UsuarioSchema);

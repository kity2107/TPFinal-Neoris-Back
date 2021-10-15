const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TipoJornadaSchema = mongoose.Schema({
  tipoJornada: {
    type: String,
    require: true,
    unique: true,
  },
  descripcion: String,
});

module.exports = model("TipoJornada", TipoJornadaSchema);

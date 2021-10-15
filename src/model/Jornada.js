const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const JornadaSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  dateIngreso: {
    type: Date,
    require: true,
  },
  dateSalida: {
    type: Date,
    require: true,
  },
  tipoJornada: {
    type: String,
    require: true,
  },
});

module.exports = model("Jornada", JornadaSchema);

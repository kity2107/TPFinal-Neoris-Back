const mongoose = require("mongoose");

const empleadoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Debe ingresar el nombre"],
  },

  apellido: String,
  edad: Number,
  email: {
    type: String,
    required: [true, "Debe ingresar el email"],
  },
  sector: String,
});
//query helper -get persona por rango de edad de
empleadoSchema.query.byEdad = function (min, max) {
  console.log("min ->" + min);
  console.log("min ->" + max);
  return this.find({}).where("edad").gt(min).lt(max);
};

//query helper - get personas por email(like)
empleadoSchema.query.byEmail = function (email) {
  console.log(email);
  return this.find({ email: { $regex: email } });
};

module.exports = mongoose.model("Empleado", empleadoSchema);

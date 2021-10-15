//importaciones
const express = require("express");
const router = express.Router();

const Empleado = require("../model/Empleados");

//devuelve un listado de empleados
router.get("/", async (req, res) => {
  const empleados = await Empleado.find();
  res.send(empleados);
});

//guardar un nuevo empleado
router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, edad, email, sector } = req.body;
    const empleado = new Empleado({
      nombre,
      apellido,
      edad,
      email,
      sector,
    });

    await empleado.save();
    //res.send(empleado);
    res.json({ status: "datos guardados" });
  } catch (error) {
    res.send({ error: "debe completar todos los campos" });
  }
});

module.exports = router;

// router.get("/:id", async (req, res) => {
//   try {
//     const persona = await Persona.findOne({ _id: req.params.id });
//     //console.log(persona);
//     res.send(persona);
//   } catch {
//     res.status(404);
//     res.send({ error: "La persona no existe" });
//   }
// });

// // patch para actualizar una persona por id
// router.patch("/:id", async (req, res) => {
//   try {
//     const persona = await Persona.findOne({ _id: req.params.id });
//     //console.log("parametros", req.body.codigoPostal);

//     if (req.body.nombre) {
//       persona.nombre = req.body.nombre;
//     }
//     if (req.body.apellido) {
//       persona.apellido = req.body.apellido;
//     }
//     if (req.body.email) {
//       persona.email = req.body.email;
//     }

//     if (req.body.email) {
//       persona.email = req.body.email;
//     }

//     if (req.body.direccion) {
//       persona.ubicacion.direccion = req.body.direccion;
//     }

//     if (req.body.provincia) {
//       persona.ubicacion.provincia = req.body.provincia;
//     }

//     if (req.body.ciudad) {
//       persona.ubicacion.ciudad = req.body.ciudad;
//     }

//     if (req.body.codigoPostal) {
//       persona.ubicacion.codigoPostal = req.body.codigoPostal;
//     }

//     await persona.save();
//     res.send(persona);
//   } catch {
//     res.status(404);
//     res.send({ error: "Persona no existe!" });
//   }
// });

// //permite borrar una persona
// router.delete("/:id", async (req, res) => {
//   console.log("delete ->", req.params.id);
//   try {
//     await Persona.deleteOne({ _id: req.params.id });
//     res.status(204).send();
//   } catch {
//     res.status(404);
//     res.send({ error: "Persona no existe" });
//   }
// });

// //query helper - personas por rango de edad
// router.get("/edad/:min/:max", async (req, res) => {
//   const personas = await Persona.find().byEdad(req.params.min, req.params.max);

//   res.send(personas);
// });

// //query helper -personas por email(like)
// router.get("/email/:email", async (req, res) => {
//   const personas = await Persona.find().byEmail(req.params.email);
//   res.send(personas);
// });

// //query helper -personas por ciudad(like)
// router.get("/ciudad/:ciudad", async (req, res) => {
//   const personas = await Persona.find().byCiudad(req.params.ciudad);
//   res.send(personas);
// });

//importaciones
const express = require("express");
const router = express.Router();

const Jornada = require("../model/Jornada");
const { validarCampos } = require("../middleware/validar-campos");

//devuelve un listado de las jornadas laborales
router.get("/", async (req, res) => {
  const jornada = await Jornada.find();
  res.send(jornada);
});

//guardar jornada
router.post("/", async (req, res) => {
  try {
    const { name, email, dateIngreso, dateSalida, tipoJornada } = req.body;
    const jornada = new Jornada({
      name,
      email,
      dateIngreso,
      dateSalida,
      tipoJornada,
    });
    await jornada.save();

    res.json({ ok: true, status: "datos guardados" });
  } catch (error) {
    res.send({ error: "debe completar todos los campos" });
  }
});

router.get("/", async (req, res) => {
  const jornada = await jornada.find().byEmail();

  res.send(jornada);
});

module.exports = router;

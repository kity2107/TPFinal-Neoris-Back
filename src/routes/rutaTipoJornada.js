//importaciones
const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");

const TipoJornada = require("../model/TipoJornada");

//devuelve un listado de las tipos de jornadas laborales
router.get("/", async (req, res) => {
  const tipoJornada = await TipoJornada.find();
  res.send(tipoJornada);
});

//guardar jornada
router.post("/", async (req, res) => {
  try {
    const { tipoJornada } = req.body;

    const tipojornada = new TipoJornada({
      tipoJornada,
    });

    await tipojornada.save();

    res.json({ ok: true, status: "datos guardados" });
  } catch (error) {
    res.send({ error: "debe completar todos los campos" });
  }
});

module.exports = router;

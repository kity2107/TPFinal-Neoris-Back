const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const {
  crearUsuario,
  loguinUsuario,
  revalidarToken,
} = require("../controllers/Autenticacion");

const { validarTokenJWT } = require("../helpers/jwtHelper");

router.post(
  "/new",
  [
    //middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El mail es obligatorio").isEmail(),
    check("password", "El password debe tener 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El mail es obligatorio").isEmail(),
    check("password", "El password debe tener 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loguinUsuario
);

router.get("/renew", validarTokenJWT, revalidarToken);

module.exports = router;

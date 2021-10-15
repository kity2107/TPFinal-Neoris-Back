const { response } = require("express");
const Usuario = require("../model/Usuario");
const bcrypt = require("bcryptjs");
const { generarTokenJWT } = require("../helpers/jwtHelper");

const crearUsuario = async (req, resp = response) => {
  const { name, email, password, operador } = req.body;

  try {
    let usuari = await Usuario.findOne({ email });

    if (usuari) {
      return resp
        .status(400)
        .json({ ok: false, msg: `usuario existente con ese email ${email}` });
    }

    usuari = new Usuario(req.body);

    //encriptamos la Contraseña
    const semilla = bcrypt.genSaltSync();

    usuari.password = bcrypt.hashSync(password, semilla);
    //guardo el nuevo usuario
    await usuari.save();

    //genero jwt
    const token = await generarTokenJWT(usuari.id, usuari.name);

    resp.status(201).json({ ok: true, usuari, token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ ok: false, msg: "no se pudo manipular User" });
  }
};

const loguinUsuario = async (req, resp = response) => {
  const { email, password } = req.body;
  try {
    let usuari = await Usuario.findOne({ email });
    if (!usuari) {
      return resp
        .status(400)
        .json({ ok: false, msg: `usuario NO EXISTE!! con ese email ${email}` });
    }

    //validar passaword
    const validaPass = bcrypt.compareSync(password, usuari.password);

    if (!validaPass) {
      return resp
        .status(400)
        .json({ ok: false, msg: "Password incorrecta!! " });
    }

    //genero jwt
    const token = await generarTokenJWT(usuari.id, usuari.name);

    resp.json({
      ok: true,
      uid: usuari.id,
      name: usuari.name,
      email: usuari.email,
      operador: usuari.operador,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ ok: false, msg: "no se pudo obtener User" });
  }
};

const revalidarToken = async (req, resp = response) => {
  const { uid, name } = req;

  //genero jwt
  const token = await generarTokenJWT(uid, name);

  resp.json({ ok: true, token });
};

module.exports = {
  crearUsuario,
  loguinUsuario,
  generarTokenJWT,
  revalidarToken,
};

const jwtToken = require("jsonwebtoken");
const { response } = require("express");

const generarTokenJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    const semilla = process.env.SECRET_JWT_SEED;

    jwtToken.sign(payload, semilla, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("no se pudo generar el token");
      }

      resolve(token);
    });
  });
};

const validarTokenJWT = (req, resp = response, next) => {
  //header x-toquen(se crea en posman para poder usar get y post)
  const tokenH = req.header("x-token");
  const semilla = process.env.SECRET_JWT_SEED;

  if (!tokenH) {
    return resp
      .status(401)
      .json({ ok: false, msg: "no existe el token de autorizacion!! " });
  }
  try {
    const { uid, name } = jwtToken.verify(tokenH, semilla);

    (req.uid = uid), name;
    req.name = name;
  } catch (err) {
    console.log(err);
    return resp.status(401).json({
      ok: false,
      msg: "token invalido!",
    });
  }
  next();
};

module.exports = { generarTokenJWT, validarTokenJWT };

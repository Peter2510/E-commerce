const Persona = require("../models/persona");
const Usuario = require("../models/usuario");

const validarCreacionAdmin = async (req, res, next) => {

  const { nombreUsuario, contrasenia, persona } = req.body;

  if (!nombreUsuario || !contrasenia || !persona) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan campos obligatorios",
    });
  }

  if (contrasenia.length < 8) {
    return res.status(400).json({
      ok: false,
      mensaje: "La contraseña debe tener al menos 8 caracteres",
    });
  }

  if (
    await validarCampoPersona({ correoElectronico: persona.correoElectronico })
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: "Correo electrónico ya registrado",
    });
  }

  next();
};

const validarCampoUsuario = async (filtro) => {
  const campo = await Usuario.findOne({
    where: filtro,
  });

  return campo ? true : false;
};

const validarCampoPersona = async (filtro) => {
  const campo = await Persona.findOne({
    where: filtro,
  });

  return campo ? true : false;
};

module.exports = validarCreacionAdmin;



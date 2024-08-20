const FormaPago = require("../models/formaPago");
const TipoUsuario = require("../models/tipoUsuario");

const getTipoUsuarios = async (req, res) => {
  try {
    const users = await TipoUsuario.findAll({
      attributes: ["id", "tipo"],
      order: [["id", "ASC"]],
    });
    res.status(400).json({ ok: true, tipoUsuarios: users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error al obtener tipo de usuario" });
  }
};

const crearTipoUsuario = async (req, res) => {
  try {
    const { tipo } = req.body;

    const newUser = await TipoUsuario.create({ tipo });
    res
      .status(200)
      .json({ ok: true, mensaje: "Tipo de usuario creado correctamente" });
  } catch (error) {
    const respuesta = await manejoErrores(error, res, "Tipo de usuario");
  }
};

const crearFormaPago = async (req, res) => {
  try {
    const { tipo } = req.body;

    const newType = await FormaPago.create({ tipo });
    res
      .status(200)
      .json({ ok: true, mensaje: "Forma de pago creado correctamente" });
  } catch (error) {
    const respuesta = await manejoErrores(error, res, "Forma de pago");
  }
};

const getFormasPago = async (req, res) => {
  try {
    const users = await FormaPago.findAll({
      attributes: ["id", "tipo"],
      order: [["id", "ASC"]],
    });
    res.status(200).json({ ok: true, formaPagos: users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error al obtener formas de pago" });
  }
};

async function manejoErrores(error, res, tabla) {
  if (error.name === "SequelizeValidationError") {
    
    // Se extraen mensajes de validación del orm
    const messages = error.errors.map((err) => err.message);

    res.status(400).json({
      ok: false,
      mensaje: messages.join(", "),
    });

  } else if (error.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      ok: false,
      mensaje: "Campo ya registrado",
    });
  } else if (error.name === "SequelizeDatabaseError") {
    res.status(500).json({
      ok: false,
      mensaje: "Error en la base de datos: " + error.message,
    });
  } else {
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor: " + error.message,
    });
  }
}

module.exports = {
    getTipoUsuarios,
    crearTipoUsuario,
    crearFormaPago,
    getFormasPago
};
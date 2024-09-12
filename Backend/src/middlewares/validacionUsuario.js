const Usuario = require("../models/usuario");

const validarExistenciaUsuarioGet = async (req, res, next) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario || isNaN(idUsuario)) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "El parámetro idUsuario es requerido y debe ser un número válido",
      });
    }

    const usuario = await Usuario.findOne({ where: { id: idUsuario } });

    if (!usuario) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "El usuario no existe" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

const validarExistenciaUsuarioPost = async (req, res, next) => {
  try {
    const { idUsuario } = req.body;

    if (!idUsuario || isNaN(idUsuario)) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "El parámetro idUsuario es requerido y debe ser un número válido",
      });
    }

    const usuario = await Usuario.findOne({ where: { id: idUsuario } });

    if (!usuario) {
      return res
        .status(400)
        .json({ ok: false, mensaje: "El usuario no existe" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

module.exports = { validarExistenciaUsuarioGet, validarExistenciaUsuarioPost };

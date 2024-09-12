const Compra = require("../models/compra");

const validarExistenciaCompraGet = async (req, res, next) => {
  try {
    const { idCompra } = req.params;

    if (!idCompra || isNaN(idCompra)) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "El parámetro idCompra es requerido y debe ser un número válido",
      });
    }

    const compra = await Compra.findOne({
      where: { id: idCompra },
    });

    if (!compra) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "La compra no existe" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

const validarExistenciaCompraPost = async (req, res, next) => {
  try {
    const { idCompra } = req.body;

    if (!idCompra || isNaN(idCompra)) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "El parámetro idCompra es requerido y debe ser un número válido",
      });
    }

    const compra = await Compra.findOne({
      where: { id: idCompra },
    });

    if (!compra) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "La compra no existe" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

module.exports = { validarExistenciaCompraGet, validarExistenciaCompraPost };
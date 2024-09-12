const FormaPago = require("../models/formaPago");

const validarFormaEntregaGet = async (req, res, next) => {
  try {
    const { idFormaEntrega } = req.params;

    if (!idFormaEntrega || isNaN(idFormaEntrega)) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "El parámetro idFormaEntrega es requerido y debe ser un número válido",
      });
    }

    const FormaEntrega = await FormaPago.findOne({
      where: { id: idFormaEntrega },
    });

    if (!FormaEntrega) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "La forma de entrega no existe" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

const validarFormaEntregaPost = async (req, res, next) => {
  try {
    const { idFormaEntrega } = req.body;

    if (!idFormaEntrega || isNaN(idFormaEntrega)) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "El parámetro idFormaEntrega es requerido y debe ser un número válido",
      });
    }

    const FormaEntrega = await FormaPago.findOne({
      where: { id: idFormaEntrega },
    });

    if (!FormaEntrega) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "La forma de entrega no existe" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

module.exports = { validarFormaEntregaGet, validarFormaEntregaPost };

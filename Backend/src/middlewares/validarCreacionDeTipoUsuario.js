const TipoUsuario = require("../models/tipoUsuario");

const validarCreacionTipoUsuario = async (req, res, next) => {

  const { tipo } = req.body;

  if (!tipo) {
    return res.status(400).json({
      ok: false,
      mensaje: "El campo tipo es requerido",
    });
  }

  if(await TipoUsuario.findOne({where:{tipo}})){
    return res.status(409).json({
      ok: false,
      mensaje: "El rol ya existe",
    });
  }

  next();
};

module.exports = validarCreacionTipoUsuario;



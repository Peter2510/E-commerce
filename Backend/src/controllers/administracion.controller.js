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
  let statusCode = 500;
  let mensaje = "Error interno del servidor: " + error.message;

  if (error.name === "SequelizeValidationError") {
    // Se extraen mensajes de validación del ORM
    const messages = error.errors.map((err) => err.message);
    statusCode = 400;
    mensaje = messages.join(", ");
  } else if (error.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    mensaje = "Campo ya registrado";
  } else if (error.name === "SequelizeDatabaseError") {
    mensaje = "Error en la base de datos: " + error.message;
  } else {
    statusCode = 500;
    mensaje = error.message;
    console.error(error);
  }

  return res.status(statusCode).json({
    ok: false,
    mensaje: mensaje,
  });
}


const editarTipoUsuario = async (req, res) => {
  try {
    const { id, nuevoNombre } = req.body;

    const busqueda = await TipoUsuario.findOne({ where: { tipo: nuevoNombre } });

    if (busqueda) {
      return res.status(409).json({
        ok: false,
        mensaje: 'El tipo de usuario ya existe'
      });
    }

    await TipoUsuario.update({ tipo: nuevoNombre}, { where: {id: id}})

    res.status(200).json({ok: true, mensaje: "Tipo de usuario actualizado correctamente"})

  } catch (error) {
    manejoErrores(error,res,'Tipo Usuario')
  }
};

const editarFormaPago = async (req, res) =>{

  try {
    
    const {id, nuevoNombre } = req.body;

    const busqueda = await FormaPago.findOne({where: {tipo: nuevoNombre}});

    if(busqueda){
      return res.status(409).json({ok: false, mensaje: 'Forma de pago ya registrada' });
    }

    await FormaPago.update({tipo: nuevoNombre}, {where: {id: id}});

    res.status(200).json({ok: true, mensaje: 'Forma de pago actualizada correctamente'})


  } catch (error) {
    manejoErrores(error, res, tabla)
  }

}


module.exports = {
    getTipoUsuarios,
    crearTipoUsuario,
    crearFormaPago,
    getFormasPago,
    editarTipoUsuario, 
    editarFormaPago
};
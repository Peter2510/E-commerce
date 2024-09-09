const FormaPago = require("../models/formaPago");
const Persona = require("../models/persona");
const TipoUsuario = require("../models/tipoUsuario");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const { manejoErrores } = require('../utils/manejoErrores.utils');
const { sequelize } = require("../configs/database.configs");
const { Op } = require('sequelize');
const Producto = require('../models/producto');
const inventario = require('../models/inventario');

const getTipoUsuarios = async (req, res) => {
  try {
    const users = await TipoUsuario.findAll({
      attributes: ["id", "tipo"],
      order: [["id", "ASC"]],
    });
    res.status(200).json({ ok: true, tipoUsuarios: users });
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
    await manejoErrores(error, res, "Tipo de usuario");
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
    await manejoErrores(error, res, "Forma de pago");
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
    await manejoErrores(error,res,'Tipo Usuario')
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
    await manejoErrores(error, res, 'Forma de pago')
  }

}

const obtenerAdminPorId = async (req, res) =>{

  try {

    const {id} = req.params;

      const usuario = await Usuario.findOne({
      where: {id: id, idTipoUsuario: 1},
      attributes: ['id', 'nombreUsuario', 'a2fActivo', 'idPersona', 'idTipoUsuario', 'activo']
    });

    if(!usuario){
      return res.status(404).json({ok: false, mensaje: 'Usuario no encontrado'});
    }

    const persona = await Persona.findOne({
      where: {id: usuario.idPersona},
      attributes: ['id', 'nombre', 'correoElectronico', 'fechaCreacion',"direccion"]
    });

    if(!usuario){
      return res.status(404).json({ok: false, mensaje: 'Usuario no encontrado'});
    }

    res.status(200).json({ok: true , usuario: usuario, persona: persona});

    
  } catch (error) {
    await manejoErrores(error, res, 'Usuario')
  }

}

const obtenerEmpleados = async (req, res) => {
  try {

    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombreUsuario', 'a2fActivo', 'idPersona', 'idTipoUsuario', 'activo'],
      where: {
        idTipoUsuario: {
          [Op.or]: [1, 3]
        }
      }
    });

    if (usuarios.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'No se encontraron usuarios' });
    }

    const resultado = [];

    for (const usuario of usuarios) {
      const persona = await Persona.findOne({
        where: { id: usuario.idPersona },
        attributes: ['id', 'nombre', 'correoElectronico', 'fechaCreacion']
      });

      resultado.push({
        usuario: usuario,
        persona: persona || null
      });
    }

    return res.status(200).json({ ok: true, empleados: resultado });

  } catch (error) {
    await manejoErrores(error, res, 'Usuario');
  }
};

const crearAdmin = async (req, res) => {
  const t = await sequelize.transaction(); 

  try {
    const { nombreUsuario, contrasenia, persona } = req.body;

    const email = await Persona.findOne({
      where: { correoElectronico: persona.correoElectronico },
      transaction: t,
    });

    if (email) {
      await t.rollback();
      return res
        .status(409)
        .json({ ok: false, mensaje: "Correo electronico ya registrado" });
    }

    if (!contrasenia) {
      await t.rollback();
      return res
        .status(400)
        .json({ ok: false, mensaje: "La contraseña es requerida" });
    }

    if (contrasenia.length < 8) {
      await t.rollback();
      return res
        .status(400)
        .json({
          ok: false,
          mensaje: "La contraseña debe tener al menos 8 caracteres",
        });
    }

    // Se crea la persona
    const newPersona = await Persona.create(persona, { transaction: t });

    // Se crea el usuario
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    await Usuario.create({
      nombreUsuario,
      contrasenia: hashedPassword,
      idPersona: newPersona.id,
      idTipoUsuario: 1,
    }, { transaction: t });

    await t.commit(); 
    res.status(200).json({ ok: true, mensaje: "Registrado correctamente" });

  } catch (error) {  
    await t.rollback(); 
    console.log(error)
    await manejoErrores(error, res, "Admin");
    
  }
};

const obtenerReporteEstadisticas = async (req, res) => {
  try {
    const [
      usuariosRegistrados,
      productosRegistrados,
      productosActivos,
      productosInactivos,
      productosSinInventario,
      productosConInventario
    ] = await Promise.all([
      Usuario.count(),
      Producto.count(),
      Producto.count({ where: { activo: true } }),
      Producto.count({ where: { activo: false } }),
      inventario.count({ where: { cantidadtotal: 0 } }),
      inventario.count({ where: { cantidadtotal: { [Op.gt]: 0 } } })
    ]);

    return res.json({
      ok: true,
      reporte: [
        {tipo: "Clientes registrados", cantidad: usuariosRegistrados},
        {tipo: "Productos registrados", cantidad: productosRegistrados},
        {tipo: "Productos activos", cantidad: productosActivos},
        {tipo: "Productos inactivos", cantidad: productosInactivos},
        {tipo: "Productos con unidades", cantidad: productosConInventario},
        {tipo: "Productos sin unidades", cantidad: productosSinInventario}
      ]
    });

  } catch (error) {
    await manejoErrores(error, res, "Reporte");
  }
};



module.exports = {
    getTipoUsuarios,
    crearTipoUsuario,
    crearFormaPago,
    getFormasPago,
    editarTipoUsuario, 
    editarFormaPago,
    obtenerAdminPorId,
    obtenerEmpleados,
    crearAdmin,
    obtenerReporteEstadisticas
};
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
const Permisos= require('../models/permiso')
const PermisosUsuario= require('../models/permisosUsuario');

const getTipoUsuarios = async (req, res) => {
  try {
    const users = await TipoUsuario.findAll({
      attributes: ["id", "tipo"],
      order: [["id", "ASC"]],
    });
    res.status(200).json({ ok: true, tipoUsuarios: users });
  } catch (error) {
    //console.log(error);
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
    //console.log(error);
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


const obtenerAyudantePorId = async (req, res) =>{

  try {

    const {id} = req.params;

      const usuario = await Usuario.findOne({
      where: {id: id, idTipoUsuario: 3},
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
    const { nombreUsuario, contrasenia, persona, idTipoUsuario } = req.body;

    // Check if the email is already registered
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

    // Validate password
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

    // Create the person
    const newPersona = await Persona.create(persona, { transaction: t });

    // Hash the password
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    
    // Create the user and capture the result
    const nuevoUsuario = await Usuario.create({
      nombreUsuario,
      contrasenia: hashedPassword,
      idPersona: newPersona.id,
      idTipoUsuario: idTipoUsuario,
    }, { transaction: t });
    //console.log('acaaaaa', idTipoUsuario);

    // Check if the user type requires permissions setup
    if (Number(idTipoUsuario) === 1) {
    //console.log('acaaaaa', idTipoUsuario);

      const idUsuario = nuevoUsuario.id;
      const permisos = await Permisos.findAll({ transaction: t });
      //console.log(idUsuario, permisos);
      
      // Create all new permissions for the user
      for (const permiso of permisos) {
        await PermisosUsuario.create({ id_empleado: idUsuario, id_permiso: permiso.id }, { transaction: t });
      }
    }

    // Commit the transaction
    await t.commit(); 
    res.status(200).json({ ok: true, mensaje: "Registrado correctamente" });

  } catch (error) {  
    // Rollback the transaction in case of error
    await t.rollback(); 
    //console.log(error);
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
  
const darBaja = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      

    await Usuario.update({ activo: false}, { where: {id: id}})

    res.status(200).json({ok: true, mensaje: "Usuario dado de baja correctamente"})

  } catch (error) {
    await manejoErrores(error,res,'Usuario')
  }
}

//funcion para activar

// ver usuarios dados de baja y los que estan activos

const editarAdmin = async (req, res) => {

  const t = await sequelize.transaction(); 

  try {
    const {idUsuario, a2fActivo } = req.body;

    const usuario = await Usuario.findOne({where: {id: idUsuario}});

    if(!usuario){
      return res.status(404).json({ok: false, mensaje: 'Usuario no encontrado'});
    }

    //se actualiza el usuario
    await Usuario.update({
      a2fActivo: a2fActivo
    }, { where: { id: idUsuario }, transaction: t });

    await t.commit(); 
    res.status(200).json({ ok: true, mensaje: "Actualización realizada correctamente" });

  } catch (error) {  
    await t.rollback(); 
    await manejoErrores(error, res, "Usuario");
  }
};

const actualizarContrasenia = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id, contraseniaActual, nuevaContrasenia } = req.body;

    if (!id) {
      await t.rollback();
      return res.status(400).json({ ok: false, mensaje: "El id del usuario es requerido" });
    }

    if (!contraseniaActual) {
      await t.rollback();
      return res.status(400).json({ ok: false, mensaje: "La contraseña actual es requerida" });
    }

    if (!nuevaContrasenia) {
      await t.rollback();
      return res.status(400).json({ ok: false, mensaje: "La nueva contraseña es requerida" });
    }

    const usuario = await Usuario.findOne({ where: { id: id } });

    if (!usuario) {
      await t.rollback();
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }

    const contraseniaActualHash = await bcrypt.compare(contraseniaActual, usuario.contrasenia);

    if (!contraseniaActualHash) {
      await t.rollback();
      return res.status(401).json({ ok: false, mensaje: "La contraseña actual es incorrecta" });
    }
   
    if (nuevaContrasenia.length < 8) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        mensaje: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    const hashContrasenia = await bcrypt.hash(nuevaContrasenia, 10);
    
    const a = await Usuario.update(
      { contrasenia: hashContrasenia }, 
      { where: { id: id }, transaction: t }
    );

    await t.commit();

    return res.status(200).json({ ok: true, mensaje: 'Contraseña actualizada correctamente' });

  } catch (error) {
    await t.rollback();
    await manejoErrores(error, res, 'Admin');
  }
};

const obtenerA2F = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findOne({ where: { id: id } });

    if (!usuario) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }

    return res.status(200).json({ ok: true, a2fActivo: usuario.a2fActivo });

  } catch (error) {
    await manejoErrores(error, res, 'Admin');
  }
}


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
  obtenerReporteEstadisticas,
  obtenerAyudantePorId,
    darBaja,
    editarAdmin,
    actualizarContrasenia,
    obtenerA2F
};
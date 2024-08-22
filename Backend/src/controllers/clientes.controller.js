const Persona = require("../models/persona");
const Usuario = require("../models/usuario");
const { manejoErrores } = require('../utils/manejoErrores.utils');
const { Op } = require('sequelize');
const { sequelize } = require("../configs/database.configs");
const bcrypt = require("bcrypt");

const obtenerClientePorId = async (req, res) =>{

    try {
  
      const {id} = req.params;
  
        const usuario = await Usuario.findOne({
        where: {id: id, idTipoUsuario: 2},
        attributes: ['id', 'nombreUsuario', 'a2fActivo', 'idPersona', 'idTipoUsuario', 'activo']
      });
  
      if(!usuario){
        return res.status(404).json({ok: false, mensaje: 'Usuario no encontrado'});
      }
  
      const persona = await Persona.findOne({
        where: {id: usuario.idPersona},
        attributes: ['id', 'nombre', 'correoElectronico', 'fechaCreacion']
      });
  
      if(!usuario){
        return res.status(404).json({ok: false, mensaje: 'Usuario no encontrado'});
      }
  
      res.status(200).json({ok: true , usuario: usuario, persona: persona});
  
      
    } catch (error) {
      await manejoErrores(error, res, 'Usuario')
    }
  
  }

const obtenerClientes = async (req, res) => {
    try {
  
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nombreUsuario', 'a2fActivo' ,'idPersona', 'activo'],
        where: {
          idTipoUsuario: 2
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
  
      return res.status(200).json({ ok: true, clientes: resultado });
  
    } catch (error) {
      await manejoErrores(error, res, 'Usuario');
    }
  };

const editarCliente = async (req, res) => {

    const t = await sequelize.transaction(); 
  
    try {
      const {id, nombreUsuario, a2fActivo, persona } = req.body;
  
      const personaBusqueda = await Persona.findOne({
        where: { id: id}
      })

      if(!personaBusqueda){
        await t.rollback();
        return res.status(404).json({ok: false, mensaje: 'Usuario no encontrado'});
      }
  
      // Se actualiza la persona
      await Persona.update(persona, { where: { id: id }, transaction: t });
        
      //se actualiza el usuario
      await Usuario.update({
        nombreUsuario,
        a2fActivo: a2fActivo
      }, { where: { id: id }, transaction: t });
  
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
    const { id, contrasenia } = req.body;

    if (!id) {
      await t.rollback();
      return res.status(400).json({ ok: false, mensaje: "El id del usuario es requerido" });
    }

    if (!contrasenia) {
      await t.rollback();
      return res.status(400).json({ ok: false, mensaje: "La contraseña es requerida" });
    }

    if (contrasenia.length < 8) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        mensaje: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    const usuario = await Usuario.findOne({ where: { id: id } });
    console.log("Usuario encontrado:", usuario);

    if (!usuario) {
      await t.rollback();
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }

    const hashContrasenia = await bcrypt.hash(contrasenia, 10);
    
    const a = await Usuario.update(
      { contrasenia: hashContrasenia }, 
      { where: { id: id }, transaction: t }
    );

    await t.commit();

    return res.status(200).json({ ok: true, mensaje: 'Contraseña actualizada correctamente' });

  } catch (error) {
    await t.rollback();
    await manejoErrores(error, res, 'Usuario');
  }
};



module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    editarCliente,
    actualizarContrasenia
}
const Persona = require("../models/persona");
const Usuario = require("../models/usuario");
const { manejoErrores } = require('../utils/manejoErrores.utils');
const { Op } = require('sequelize');


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


module.exports = {
    obtenerClientes,
    obtenerClientePorId
}
const Marca = require("../models/marca");
const {sequelize} = require("../configs/database.configs");
const { manejoErrores } = require('../utils/manejoErrores.utils');
const { Op } = require('sequelize');

const crearMarca = async (req, res) => {
    const t = await sequelize.transaction();

    try{
        const {nombreMarca} = req.body;

        //validamos el nombre de la marca
        if(!nombreMarca){
            await t.rollback();
            return res
                .status(400)
                .json({ok:false, mensaje: "El nombre de la marca es requerido"})       
        }
    
        //validamos que el nombre no exista
        const existeMarca = await Marca.findOne({
            where: {nombreMarca},
            transaction: t,
        });
    
        if(existeMarca){
            await t.rollback();
            return res
                .status(409)
                .json({ok: false, mensaje: "El nombre de la marca ya existe"});
        }
    
        //Se crea la marca
        await Marca.create({nombreMarca}, {transaction:t});
    
        await t.commit();
        res.status(201.).json({ok:true, mensaje: "Nombre de Marca creado correctamente"})
    } catch(error){
        await t.rollback();
        await manejoErrores(error, res, "Marca");
    }
    
};

const obtenerMarcas = async (req, res) => {
    try {
      const marcas = await Marca.findAll();
      res.status(200).json({ ok: true, marcas });
    } catch (error) {
      await manejoErrores(error, res, "Marca");
    }
  };

const obtenerMarcaPorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const marca = await Marca.findByPk(id);
  
      if (!marca) {
        return res.status(404).json({ ok: false, mensaje: "Marca no encontrada" });
      }
  
      res.status(200).json({ ok: true, marca });
    } catch (error) {
      await manejoErrores(error, res, "Marca");
    }
  };


  const actualizarMarca = async (req, res) => {
    const { id } = req.params;
    const { nombreMarca } = req.body;
  
    const t = await sequelize.transaction(); 
  
    try {
      if (!nombreMarca) {
        await t.rollback();
        return res
          .status(400)
          .json({ ok: false, mensaje: "El nombre de la marca es requerido" });
      }
  
      // Verificar si la marca existe
      const marca = await Marca.findByPk(id);
  
      if (!marca) {
        await t.rollback();
        return res.status(404).json({ ok: false, mensaje: "Marca no encontrada" });
      }
  
      // Actualizar la marca
      marca.nombreMarca = nombreMarca;
      await marca.save({ transaction: t });
  
      await t.commit(); 
      res.status(200).json({ ok: true, mensaje: "Marca actualizada correctamente" });
  
    } catch (error) {  
      await t.rollback(); 
      await manejoErrores(error, res, "Marca");
    }
  };

const eliminarMarca = async (req, res) => {
    const { id } = req.params;
  
    try {
      const marca = await Marca.findByPk(id);
  
      if (!marca) {
        return res.status(404).json({ ok: false, mensaje: "Marca no encontrada" });
      }
  
      await marca.destroy();
      res.status(200).json({ ok: true, mensaje: "Marca eliminada correctamente" });
    } catch (error) {
      await manejoErrores(error, res, "Marca");
    }
  };





  module.exports = {
    crearMarca,
    obtenerMarcas,
    obtenerMarcaPorId,
    actualizarMarca,
    eliminarMarca
  };
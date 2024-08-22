const Categoria = require("../models/categoria");
const {sequelize} = require("../configs/database.configs");
const { manejoErrores } = require('../utils/manejoErrores.utils');
const { Op } = require('sequelize');

const crearCategoria = async (req, res) => {
    const t = await sequelize.transaction();

    try{
        const {nombreCategoria} = req.body;

        //validamos el nombre de la cat
        if(!nombreCategoria){
            await t.rollback();
            return res
                .status(400)
                .json({ok:false, mensaje: "El nombre de la Categoria es requerido"})       
        }
    
        //validamos que el nombre no exista
        const existeCategoria = await Categoria.findOne({
            where: {nombreCategoria},
            transaction: t,
        });
    
        if(existeCategoria){
            await t.rollback();
            return res
                .status(409)
                .json({ok: false, mensaje: "El nombre de la Categoria ya existe"});
        }
    
        //Se crea la Categoria
        await Categoria.create({nombreCategoria}, {transaction:t});
    
        await t.commit();
        res.status(201.).json({ok:true, mensaje: "Nombre de Categoria creado correctamente"})
    } catch(error){
        await t.rollback();
        await manejoErrores(error, res, "Categoria");
    }
    
};

const obtenerCategorias = async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.status(200).json({ ok: true, categorias });
    } catch (error) {
      await manejoErrores(error, res, "Categoria");
    }
  };


const obtenerCategoriaPorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        return res.status(404).json({ ok: false, mensaje: "Categoria No Encontrada" });
      }
  
      res.status(200).json({ ok: true, categoria });
    } catch (error) {
      await manejoErrores(error, res, "Categoria");
    }
  };


  const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombreCategoria } = req.body;
  
    const t = await sequelize.transaction(); 
  
    try {
      if (!nombreCategoria) {
        await t.rollback();
        return res
          .status(400)
          .json({ ok: false, mensaje: "El nombre de la categoria es requerido" });
      }
  
      // Verificar si la categoria existe
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        await t.rollback();
        return res.status(404).json({ ok: false, mensaje: "Categoria no encontrada" });
      }
  
      // Actualizar la categoria
      categoria.nombreCategoria = nombreCategoria;
      await categoria.save({ transaction: t });
  
      await t.commit(); 
      res.status(200).json({ ok: true, mensaje: "Nombre categoria actualizada correctamente" });
  
    } catch (error) {  
      await t.rollback(); 
      await manejoErrores(error, res, "Categoria");
    }
  };

const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
  
    try {
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        return res.status(404).json({ ok: false, mensaje: "Categoria no encontrada" });
      }
  
      await categoria.destroy();
      res.status(200).json({ ok: true, mensaje: "Categoria eliminada correctamente" });
    } catch (error) {
      await manejoErrores(error, res, "Categoria");
    }
  };





module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
}





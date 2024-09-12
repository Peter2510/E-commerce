const Categoria = require("../models/categoria");
const {sequelize} = require("../configs/database.configs");
const { manejoErrores } = require('../utils/manejoErrores.utils');
const { Op } = require('sequelize');
const { generarNombreArchivo, subirArchivo, obtenerUrlFirmada, eliminarArchivo } = require("../utils/manejoArchivos.utils");

const crearCategoria = async (req, res) => {
    const t = await sequelize.transaction();

    try{
        const {nombreCategoria} = req.body;
        const { imagen } = req.files|| {}; //obtenemos la imagen
        console.log(imagen);
        

        //validamos el nombre de la cat
        if(!nombreCategoria){
            await t.rollback();
            return res
                .status(400)
                .json({ok:false, mensaje: "El nombre de la Categoria es requerido"})       
        }

        //Validamos que venga una imagen
        if(!imagen){
          await t.rollback();
          return res
            .status(400)
            .json({ok:false, mensaje:"La imagen de la categoria es requerida"})
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

        //Suimos la imagen
        imagen.name = generarNombreArchivo(imagen);
        const respuesta = await subirArchivo(imagen);
        if(respuesta.$metadata.httpStatusCode !==200) {
          await t.rollback();
          return res
            .status(500)
            .json({ ok: false, mensaje: "Error al subir imagen"})
        }

        const nombreImagen = imagen.name;
    
        //Se crea la Categoria con la imagen
        await Categoria.create({nombreCategoria, imagen: nombreImagen}, {transaction:t});
    
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

      // Crear un array para almacenar las categorias con sus URLs de imágenes firmadas
      const categoriasConImagenes = await Promise.all(
          categorias.map(async (categoria) => {
              // Verificar si la propiedad 'imagen' existe y no está vacía
              if (categoria.imagen) {
                  // Obtener la URL firmada para la imagen de la categoria
                  const url = await obtenerUrlFirmada(categoria.imagen);

                  // Asignar la URL firmada a la propiedad de imagen de la categoria
                  categoria.setDataValue("imagen", [{ "nombre": categoria.imagen, "url": url }]);
              } else {
                  // Si no hay imagen, asignar un valor predeterminado o vacío
                  categoria.setDataValue("imagen", []);
              }

              return categoria;
          })
      );

      res.status(200).json({ ok: true, categorias: categoriasConImagenes });
  } catch (error) {
      await manejoErrores(error, res, "Categoria");
  }
};

const obtenerCategoriasRegex = async (req, res) => {

    try {
  const { nombre } = req.body;

      console.log(nombre, req.body);
      
      const categorias = await Categoria.findAll({      where: {
              nombreCategoria: {
                [Op.iRegexp]: nombre,
              },
            },});

      // Crear un array para almacenar las categorias con sus URLs de imágenes firmadas
      const categoriasConImagenes = await Promise.all(
          categorias.map(async (categoria) => {
              // Verificar si la propiedad 'imagen' existe y no está vacía
              if (categoria.imagen) {
                  // Obtener la URL firmada para la imagen de la categoria
                  const url = await obtenerUrlFirmada(categoria.imagen);

                  // Asignar la URL firmada a la propiedad de imagen de la categoria
                  categoria.setDataValue("imagen", [{ "nombre": categoria.imagen, "url": url }]);
              } else {
                  // Si no hay imagen, asignar un valor predeterminado o vacío
                  categoria.setDataValue("imagen", []);
              }

              return categoria;
          })
      );

      res.status(200).json({ ok: true, categorias: categoriasConImagenes });
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
      const url = await obtenerUrlFirmada(categoria.imagen)
      categoria.setDataValue("imagen", [{"nombre": categoria.imagen, "url":url}])
      res.status(200).json({ ok: true, categoria });
    } catch (error) {
      await manejoErrores(error, res, "Categoria");
    }
  };


  const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nuevoNombre } = req.body;
    const { nuevaImagen } = req.files || {};
    const t = await sequelize.transaction(); 

    try {
        if (!nuevoNombre) {
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


        if (nuevaImagen) {
            // Si viene nueva imagen, eliminar la antigua
            const eliminarImagen = await eliminarArchivo(categoria.imagen);

            if (eliminarImagen.$metadata.httpStatusCode !== 204) {
                await t.rollback();
                return res
                    .status(500)
                    .json({ ok: false, mensaje: "Error al eliminar la imagen" });
            }

            nuevaImagen.name = generarNombreArchivo(nuevaImagen);

            const respuesta = await subirArchivo(nuevaImagen);

            if (respuesta.$metadata.httpStatusCode !== 200) {
                await t.rollback();
                return res
                    .status(500)
                    .json({ ok: false, mensaje: "Error al subir la imagen" });
            }

            // Actualizar la categoria con nuevo nombre e imagen
            await categoria.update({ nombreCategoria: nuevoNombre, imagen: nuevaImagen.name }, { transaction: t });
        } else {
            // Si no hay nueva imagen, solo actualizar el nombre
            await categoria.update({ nombreCategoria: nuevoNombre }, { transaction: t });
        }

        await t.commit(); 
        return res.status(200).json({ ok: true, mensaje: "Categoria actualizada correctamente" });

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
    eliminarCategoria,
    obtenerCategoriasRegex
}





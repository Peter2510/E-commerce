const Marca = require("../models/marca");
const {sequelize} = require("../configs/database.configs");
const { manejoErrores } = require('../utils/manejoErrores.utils');
const { Op } = require('sequelize');
const {subirArchivo, generarNombreArchivo, obtenerUrlFirmada, eliminarArchivo} = require('../utils/manejoArchivos.utils') 


const crearMarca = async (req, res) => {
  const t = await sequelize.transaction();

  try {
      const { nombreMarca } = req.body;
      const {imagen} = req.files; // Obtener la imagen del request

      // Validamos el nombre de la marca
      if (!nombreMarca) {
          await t.rollback();
          return res
              .status(400)
              .json({ ok: false, mensaje: "El nombre de la marca es requerido" });
      }

      // Validamos la imagen
      if (!imagen) {
          await t.rollback();
          return res
              .status(400)
              .json({ ok: false, mensaje: "La imagen es requerida" });
      }

      // Validamos que el nombre de la marca no exista
      const existeMarca = await Marca.findOne({
          where: { nombreMarca },
          transaction: t,
      });

      if (existeMarca) {
          await t.rollback();
          return res
              .status(409)
              .json({ ok: false, mensaje: "El nombre de la marca ya existe" });
      }

      // Subir la imagen
      imagen.name = generarNombreArchivo(imagen);
      const respuesta = await subirArchivo(imagen); // Función que maneja la subida de archivos
      if (respuesta.$metadata.httpStatusCode !== 200) {
          await t.rollback();
          return res
              .status(500)
              .json({ ok: false, mensaje: "Error al subir la imagen" });
      }
      
      const nombreImagen = imagen.name;

      // Crear la marca con la imagen
      await Marca.create({ nombreMarca, imagen: nombreImagen }, { transaction: t });

      await t.commit();
      res.status(201).json({ ok: true, mensaje: "Marca creada correctamente" });
  } catch (error) {
      await t.rollback();
      await manejoErrores(error, res, "Marca");
  }
  
};

const obtenerMarcas = async (req, res) => {
  try {
      const marcas = await Marca.findAll();

      // Crear un array para almacenar las marcas con sus URLs de imágenes firmadas
      const marcasConImagenes = await Promise.all(
          marcas.map(async (marca) => {
              // Verificar si la propiedad 'imagen' existe y no está vacía
              if (marca.imagen) {
                  // Obtener la URL firmada para la imagen de la marca
                  const url = await obtenerUrlFirmada(marca.imagen);

                  // Asignar la URL firmada a la propiedad de imagen de la marca
                  marca.setDataValue("imagen", [{ "nombre": marca.imagen, "url": url }]);
              } else {
                  // Si no hay imagen, asignar un valor predeterminado o vacío
                  marca.setDataValue("imagen", []);
              }

              return marca;
          })
      );

      res.status(200).json({ ok: true, marcas: marcasConImagenes });
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
      const url = await obtenerUrlFirmada(marca.imagen)
      marca.setDataValue("imagen", [{"nombre": marca.imagen, "url": url}] ); 
      res.status(200).json({ ok: true, marca });
    } catch (error) {
      await manejoErrores(error, res, "Marca");
    }
  };


  const actualizarMarca = async (req, res) => {
    const { id } = req.params;
    const { nuevoNombre } = req.body;
    const { nuevaImagen} = req.files || {};
    const t = await sequelize.transaction(); 
  
    try {
      if (!nuevoNombre) {
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
      //Eliminar
      if(nuevaImagen) {
        //si viene nueva imagen
        const eliminarImagen = await eliminarArchivo(marca.imagen);

        console.log(eliminarImagen);
        if (eliminarImagen.$metadata.httpStatusCode !== 204) {
          await t.rollback();
          return res
              .status(500)
              .json({ ok: false, mensaje: "Error al eliminar la imagen" });
      }

        nuevaImagen.name = generarNombreArchivo(nuevaImagen);

        const respuesta = await subirArchivo(nuevaImagen); // Función que maneja la subida de archivos

        if (respuesta.$metadata.httpStatusCode !== 200) {
          await t.rollback();
          return res
              .status(500)
              .json({ ok: false, mensaje: "Error al subir la imagen" });
      }

      await marca.update({nombre: nuevoNombre, imagen: nuevaImagen.name }, {transaction:t})


      }

      await marca.update({nombre: nuevoNombre }, {transaction:t})
      // Actualizar la marca
  
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
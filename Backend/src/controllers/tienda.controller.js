const { sequelize } = require("../configs/database.configs");
const Producto = require("../models/producto");
const Marca = require("../models/marca");
const Tienda = require("../models/tienda");
const UrlImangen = require("../models/imagenProducto");
const { manejoErrores } = require("../utils/manejoErrores.utils");
const {
  subirArchivo,
  obtenerUrlFirmada,
  eliminarArchivo,
  generarNombreArchivo,
} = require("../utils/manejoArchivos.utils");
const { where } = require("sequelize");
const { Op } = require("sequelize");
const inventario = require("../models/inventario");
const estadoInventario = require("../models/estadoInventario");

const creacionEmpresa = async (req, res) => {
    const t = await sequelize.transaction();

  try {
    const {tienda} = req.body;
    const { imagen } = req.files; 
    const elementoTienda = JSON.parse(tienda)
    console.log(elementoTienda, imagen, "----------------------------", elementoTienda.tienda.nombre);
    
             //validamos el nombre de la cat 
        if(!elementoTienda.tienda){
            await t.rollback();
            return res
                .status(400)
                .json({ok:false, mensaje: "Elementos de tienda son requeridos"})       
        }

        //Validamos que venga una imagen
        if(!imagen){
          await t.rollback();
          return res
            .status(400)
            .json({ok:false, mensaje:"La imagen de la tienda es requerida"})
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
        //Se crea 
        await Tienda.create({nombre: elementoTienda.tienda.nombre, urlLogo: nombreImagen, direccion: elementoTienda.tienda.direccion}, {transaction:t});
        await t.commit();
        res.status(201.).json({ok:true, mensaje: "informacion de tienda ingresado correctamente"})
  } catch (error) {
            await t.rollback();
        await manejoErrores(error, res, "Tienda");
   }
}

const obtenerElementos = async (req, res) => {
  try {
      const tienda = await Tienda.findAll();

      const imagenTienda = await Promise.all(
          tienda.map(async (tiendaInfo) => {
              if (tiendaInfo.urlLogo) {
                  // Obtener la URL firmada para la imagen de la categoria
                  const url = await obtenerUrlFirmada(tiendaInfo.urlLogo);

                  tiendaInfo.setDataValue("imagen", { "nombre": tiendaInfo.imagen, "url": url });
              } else {
                  // Si no hay imagen, asignar un valor predeterminado o vacío
                  tiendaInfo.setDataValue("imagen", []);
              }

              return tiendaInfo;
          })
      );

      res.status(200).json({ ok: true, tienda: imagenTienda });
      
    } catch (error) {
      
    }
}

module.exports = {
    creacionEmpresa,
    obtenerElementos
}
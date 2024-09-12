const { sequelize } = require("../configs/database.configs");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");
const Tienda = require("../models/tienda");
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const { manejoErrores } = require("../utils/manejoErrores.utils");
const {
  subirArchivo,
  obtenerUrlFirmada,
  eliminarArchivo,
  generarNombreArchivo,
} = require("../utils/manejoArchivos.utils");


const creacionEmpresa = async (req, res) => {
    const t = await sequelize.transaction();
  try {
    const {tienda} = req.body;
    const { imagen } = req.files; 
    const elementoTienda = JSON.parse(tienda)
    console.log(elementoTienda, imagen, "----------------------------", elementoTienda.nombre);
    
             //validamos el nombre de la cat 
        if(!elementoTienda){
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
    console.log(nombreImagen);
    
        //Se crea 
        await Tienda.create({nombre: elementoTienda.nombre, urlLogo: nombreImagen, direccion: elementoTienda.direccion}, {transaction:t});
        await t.commit();
        res.status(201.).json({ok:true, mensaje: "informacion de tienda ingresado correctamente"})
  } catch (error) {
    await t.rollback();
    console.log(error);
    
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


const editarEmpresa = async (req, res) => {
  const t = await sequelize.transaction(); 
  try {
      const {tienda, password, idUsuario, imagenActualCambiar} = req.body;
    const { imagenCambiar } = req.files || '';
    const elementoTienda = JSON.parse(tienda)

    console.log(elementoTienda, password, idUsuario, imagenCambiar);
    
    //no viene la info de tienda
    if (!elementoTienda) {
      t.rollback();
                return res
            .status(400)
            .json({ok:false, mensaje:"La informacion de la tienda es requerida"})
    }
    
    const buscarExistencia = await Usuario.findOne(
      {where: {id: idUsuario}}
    )
    console.log(buscarExistencia);
    
    const contraseniaValida  = await bcrypt.compare(password, buscarExistencia.contrasenia);
    console.log(contraseniaValida);


    if (!contraseniaValida) {
      t.rollback();

      return res.status(401).json({ ok: false, mensaje: "Credenciales incorrectas" });
    }
    
    if (imagenCambiar) {
            const eliminarImagen = await eliminarArchivo(imagenActualCambiar);

            if (eliminarImagen.$metadata.httpStatusCode !== 204) {
                await t.rollback();
                return res
                    .status(500)
                    .json({ ok: false, mensaje: "Error al eliminar la imagen" });
            }
        
            imagenCambiar.name = generarNombreArchivo(imagenCambiar);

            const respuesta = await subirArchivo(imagenCambiar);

            if (respuesta.$metadata.httpStatusCode !== 200) {
                await t.rollback();
                return res
                    .status(500)
                    .json({ ok: false, mensaje: "Error al subir la imagen" });
            }
        
        //si todo esta bien
        console.log('cambio aca');
        
            await Tienda.update({nombre: elementoTienda.nombre, urlLogo:  imagenCambiar.name, direccion: elementoTienda.direccion},{where: {id: elementoTienda.id}} ,{transaction:t});
    } else {
        console.log('cambio aca2');

            await Tienda.update({nombre: elementoTienda.nombre, direccion: elementoTienda.direccion},{where: {id: elementoTienda.id}} , {transaction:t});

    }
       await t.commit(); 
        return res.status(200).json({ ok: true, mensaje: "empresa actualizada correctamente" });

    } catch (error) {  
        await t.rollback(); 
        await manejoErrores(error, res, "Tienda");
    }
}

const descargarLogoBase64 = async (req, res) => {
  try {
    const { nombreTienda } = req.params;

    //nombre imagen base de dats
    const nombreImagen = await Tienda.findOne({
      where: { nombre: nombreTienda },
      attributes: ["urlLogo"]
    });

    if (!nombreImagen || !nombreImagen.urlLogo) {
      return res.status(404).json({ ok: false, mensaje: "No se encontró la imagen" });
    }

    //url firmada
    const urlImagen = await obtenerUrlFirmada(nombreImagen.urlLogo);

    //determinar el protocolo y el cliente HTTP adecuado
    const url = new URL(urlImagen);
    const client = url.protocol === 'https:' ? https : http;

    //construir la ruta del archivo en el sistema
    const tempDir = path.join(__dirname, '../../temp');
    const filePath = path.join(tempDir, path.basename(nombreImagen.urlLogo));

    //si no existe la carpeta se debe crear xd
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    //descago el logo
    client.get(url.href, (response) => {
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          //leer el logo recién guardado
          fs.readFile(filePath, (err, data) => {
            if (err) {
              console.error('Error al leer el archivo:', err);
              return res.status(500).json({ ok: false, mensaje: "Error al leer el archivo" });
            }

            //convertir la imagen a Base64
            const base64 = Buffer.from(data).toString('base64');

            //extraer la extensión del archivo
            const extension = path.extname(filePath).slice(1);

            res.status(200).json({ ok: true, base64: `data:image/${extension};base64,${base64}`, base64Simple: base64, tipo: `image/${extension}`, extension: extension });
          });
        });
      });

      fileStream.on('error', (err) => {
        console.error('Error al guardar el archivo:', err);
        res.status(500).json({ ok: false, mensaje: "Error al guardar el archivo" });
      });

    }).on('error', (err) => {
      console.error('Error al descargar el archivo:', err);
      res.status(500).json({ ok: false, mensaje: "Error al descargar el archivo" });
    });

  } catch (error) {
    console.error('Error en la función descargarLogoBase64:', error);
    await manejoErrores(error, res, "Tienda");
  }
};



module.exports = {
    creacionEmpresa,
  obtenerElementos,
    editarEmpresa,
    descargarLogoBase64
}
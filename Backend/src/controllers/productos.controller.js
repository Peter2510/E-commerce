const { sequelize } = require("../configs/database.configs");
const Producto = require('../models/producto');
const Marca = require('../models/marca');
const Categoria = require('../models/categoria');
const UrlImangen = require("../models/imagenProducto");
const { manejoErrores } = require("../utils/manejoErrores.utils");
const { subirArchivo, obtenerUrlFirmada, eliminarArchivo, generarNombreArchivo } = require("../utils/manejoArchivos.utils");



const crearProducto = async (req, res) => {

    const t = await sequelize.transaction();

    try {

        const { imagenes } = req.files;
        const { nombre, precio, descripcion, minimoInventario, idCategoria, idMarca } = req.body;

        const arrayImagenes = Array.isArray(imagenes) ? imagenes : [imagenes];

        const producto = await Producto.create({
            nombre,
            precio,
            descripcion,
            minimoInventario,
            idCategoria,
            idMarca
        }, { transaction: t });

        for (const imagen of arrayImagenes) {
            
            //genera un nombre aleatorio y unico para cada imagen
            imagen.name = generarNombreArchivo(imagen);

            const respuesta = await subirArchivo(imagen);

            if (respuesta.$metadata.httpStatusCode === 200) {

                await UrlImangen.create({
                    nombre: imagen.name,
                    idProducto: producto.id
                },
                    { transaction: t })
            } else {
                await t.rollback();
                return res.json({ ok: false, mensaje: 'Error al subir imagen' });
            }
        }

        await t.commit();

        return res.json({ ok: true, mensaje: 'Producto creado con éxito' });


    } catch (error) {
        await t.rollback();
        await manejoErrores(error, res, "Producto");
    }

}

const obtenerProducto = async (req, res) => {
    const { id } = req.params;

    try {

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
        }

        const [marca, categoria] = await Promise.all([
            Marca.findByPk(producto.idMarca),
            Categoria.findByPk(producto.idCategoria)
        ]);

        const imagenes = await UrlImangen.findAll({
            where: {
                idProducto: producto.id
            }
        });

        let imagenesFirmadas = [];

        for (const imagen of imagenes) {
            const url = await obtenerUrlFirmada(imagen.nombre)
            imagenesFirmadas.push({nombre: imagen.nombre, url: url});
        }

        if (!marca || !categoria) {
            return res.status(404).json({ ok: false, mensaje: 'Marca o categoría no encontrada' });
        }

        return res.json({
            ok: true,
            producto: {
                ...producto.toJSON(),
                marca: marca.nombreMarca,
                categoria: categoria.nombreCategoria,
                url_imagenes: imagenesFirmadas
            }
        });

    } catch (error) {
        await manejoErrores(error, res, "Producto");
    }
}

const editarProducto = async (req, res) => {

    const { imagenes } = req.files || {};
    const { id, nombre, precio, descripcion, minimoInventario, idCategoria, idMarca, imagenesEliminar } = req.body;

    const t = await sequelize.transaction();

    try {

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
        }

        await Producto.update({
            nombre,
            precio,
            descripcion,
            minimoInventario,
            idCategoria,
            idMarca
        }, {
            where: {
                id
            },
            transaction: t
        });

        // //Para eliminar imagenes
        if(imagenesEliminar){
            //array con el nombre de las imagenes a eliminar
            const arrayImagenesEliminar = Array.isArray(imagenesEliminar) ? imagenesEliminar : [imagenesEliminar];
            for (const nombreImagen of arrayImagenesEliminar){
                //eliminar imagen de la base de datos
                await UrlImangen.destroy( {where: { nombre: nombreImagen }},  { transaction: t });
                //eliminar imagen del bucket
                const respuesta = await eliminarArchivo(nombreImagen);
                if (respuesta.$metadata.httpStatusCode !== 204) {
                    await t.rollback();
                    return res(400).json({ ok: false, mensaje: 'Error al eliminar imagen' });
                }
            }

        }
        
        //Para agregar nuevas imagenes
        if (imagenes) {
            const arrayImagenes = Array.isArray(imagenes) ? imagenes : [imagenes];

            for (const imagen of arrayImagenes) {

                imagen.name = generarNombreArchivo(imagen);

                const respuesta = await subirArchivo(imagen);

                if (respuesta.$metadata.httpStatusCode === 200) {

                    await UrlImangen.create({
                        nombre: imagen.name,
                        idProducto: producto.id
                    },
                        { transaction: t });

                } else {
                    await t.rollback();
                    return res(400).json({ ok: false, mensaje: 'Error al subir imagen' });
                }
            }
        }

        await t.commit();

        return res.status(200).json({ ok: true, mensaje: 'Producto editado con éxito' });

    } catch (error) {
        await t.rollback();
        await manejoErrores(error, res, "Producto");
    }
}

const cambiarEstadoActivoProducto = async (req, res) => {
   
    const { id } = req.params;
    const { estado } = req.body;

    try {

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
        }

        await Producto.update({
            activo: estado
        }, {
            where: {
                id
            }
        });

        return res.json({ ok: true, mensaje: 'Estado del producto actualizado con éxito' });

    } catch (error) {
        await manejoErrores(error, res, "Producto");
    }
}

const obtenerProductosRandom = async (req, res) => {
    try {
        
        const { cantidad } = req.params;

        const productos = await Producto.findAll({    
            attributes: ['id', 'nombre', 'precio'],       
            include: [
                {
                    model: Marca,
                    as: 'marca',
                    attributes: ['nombreMarca']
                },
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['nombreCategoria']
                }
            ],
            order: sequelize.random(),
            limit: cantidad,
        });

        if (productos.length < 1) {
            return res.status(404).json({ ok: false, mensaje: 'No hay productos registrados' });
        }

        for (const producto of productos) {
            const imagenes = await UrlImangen.findAll({
                where: {
                    idProducto: producto.id
                }
            });

            let imagenesFirmadas = [];

            for (const imagen of imagenes) {
                const url = await obtenerUrlFirmada(imagen.nombre)
                imagenesFirmadas.push({nombre: imagen.nombre, url: url});
            }

            producto.dataValues.url_imagenes = imagenesFirmadas;
        }

        return res.json({ ok: true, productos });


    } catch (error) {
        await manejoErrores(error, res, "Producto");
    }
}


module.exports = {
    crearProducto,
    obtenerProducto,
    editarProducto,
    cambiarEstadoActivoProducto,
    obtenerProductosRandom
}
const { sequelize } = require("../configs/database.configs");
const Producto = require('../models/producto');
const Marca = require('../models/marca');
const Categoria = require('../models/categoria');
const UrlImangen = require("../models/imagenProducto");
const { manejoErrores } = require("../utils/manejoErrores.utils");
const { subirArchivo, obtenerUrlFirmada, eliminarArchivo, generarNombreArchivo } = require("../utils/manejoArchivos.utils");
const { where } = require("sequelize");
const { Op } = require('sequelize');



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

const filtrarProductos = async (req, res) => {
    const { idCategoria, idMarca, sortBy = 'nombre', order = 'ASC' } = req.query;

    try {
        // Construir la cláusula where dinámica
        const whereClause = {};

        if (idCategoria) {
            whereClause.idCategoria = idCategoria;
        }

        if (idMarca) {
            whereClause.idMarca = idMarca;
        }

        // Validar y establecer el criterio de ordenamiento
        const validSortFields = ['nombre', 'precio', 'minimoInventario'];
        const validOrders = ['ASC', 'DESC'];

        // Validar el campo de ordenamiento
        if (!validSortFields.includes(sortBy)) {
            return res.status(400).json({ ok: false, mensaje: 'Campo de ordenamiento no válido' });
        }

        // Validar el tipo de ordenamiento
        if (!validOrders.includes(order.toUpperCase())) {
            return res.status(400).json({ ok: false, mensaje: 'Tipo de ordenamiento no válido' });
        }

        // Obtener productos filtrados y ordenados según los parámetros proporcionados
        const productos = await Producto.findAll({
            where: whereClause,
            order: [[sortBy, order.toUpperCase()]] // Ordenar por el campo y tipo especificados
        });

        if (!productos.length) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontraron productos con los filtros proporcionados' });
        }

        // Obtener marcas y categorías asociadas para cada producto
        const productosConDetalles = await Promise.all(productos.map(async (producto) => {
            const [marca, categoria, imagenes] = await Promise.all([
                Marca.findByPk(producto.idMarca),
                Categoria.findByPk(producto.idCategoria),
                UrlImangen.findAll({
                    where: { idProducto: producto.id }
                })
            ]);

            let imagenesFirmadas = [];
            for (const imagen of imagenes) {
                const url = await obtenerUrlFirmada(imagen.nombre);
                imagenesFirmadas.push({ nombre: imagen.nombre, url: url });
            }

            return {
                ...producto.toJSON(),
                marca: marca ? marca.nombreMarca : null,
                categoria: categoria ? categoria.nombreCategoria : null,
                url_imagenes: imagenesFirmadas
            };
        }));

        return res.json({ ok: true, productos: productosConDetalles });

    } catch (error) {
        await manejoErrores(error, res, "Producto");
    }

    //http://localhost:3200/api/v1/productos/filtrar?idMarca=3&idCategoria=4&sortBy=precio&order=ASC
};

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


const filtrarRegex = async (req, res) => {
    const { tipo, nombre } = req.query;

    try {
        console.log("aaaa",tipo, nombre);
        
        if (tipo && nombre) {
            switch (tipo) {
                case 'Precio':
                    const productosPorPrecio = await Producto.findAll({
                        where: {
                            precio: nombre
                        }
                    });
                   const productosConDetallesPrecio = await Promise.all(productosPorPrecio.map(async (producto) => {
                        // Obtener la marca y la categoría
                        const [marca, categoria, imagenes] = await Promise.all([
                            Marca.findByPk(producto.idMarca),
                            Categoria.findByPk(producto.idCategoria),
                            UrlImangen.findAll({
                                where: { idProducto: producto.id }
                            })
                        ]);

                        let imagenesFirmadas = [];
                        for (const imagen of imagenes) {
                            const url = await obtenerUrlFirmada(imagen.nombre);
                            imagenesFirmadas.push({ nombre: imagen.nombre, url: url });
                        }

                        return {
                            id: producto.id,
                            nombre: producto.nombre,
                            precio: producto.precio,
                            marca: marca ? marca : null,
                            categoria: categoria ? categoria: null,
                            url_imagenes: imagenesFirmadas
                        };
                    }))
                            
                            
                    return res.json({productos: productosConDetallesPrecio });
                    
                case 'Marca':
                    const marcas = await Marca.findAll({
                        where: {
                            nombreMarca: {
                                [Op.iRegexp]: nombre
                            }
                        }
                    });

                    const productosPorMarcas = await Promise.all(
                        marcas.map(marca => Producto.findAll({
                            where: { idMarca: marca.id }
                        }))
                    );


                    //array con elemenetos concatenados
                     const productos = productosPorMarcas.flat();
                    const productosConDetallesMarca = await Promise.all(productos.map(async (producto) => {
                        // Obtener la marca y la categoría
                        const [marca, categoria, imagenes] = await Promise.all([
                            Marca.findByPk(producto.idMarca),
                            Categoria.findByPk(producto.idCategoria),
                            UrlImangen.findAll({
                                where: { idProducto: producto.id }
                            })
                        ]);

                        let imagenesFirmadas = [];
                        for (const imagen of imagenes) {
                            const url = await obtenerUrlFirmada(imagen.nombre);
                            imagenesFirmadas.push({ nombre: imagen.nombre, url: url });
                        }

                        return {
                            id: producto.id,
                            nombre: producto.nombre,
                            precio: producto.precio,
                            marca: marca ? marca : null,
                            categoria: categoria ? categoria: null,
                            url_imagenes: imagenesFirmadas
                        };
                    }))
                         

                    return res.json({productos:productosConDetallesMarca});

                case 'Categoria':
                    const categorias = await Categoria.findAll({
                        where: {
                            nombreCategoria: {
                                [Op.iRegexp]: nombre
                            }
                        }
                    });

                    const productosPorCategorias = await Promise.all(
                        categorias.map(categoria => Producto.findAll({
                            where: { idCategoria: categoria.id }
                        }))
                    );


                    //array con elemenetos concatenados
                     const productosCategoria = productosPorCategorias.flat();
                    const productosConDetallesCategoria = await Promise.all(productosCategoria.map(async (producto) => {
                        // Obtener la marca y la categoría
                        const [marca, categoria, imagenes] = await Promise.all([
                            Marca.findByPk(producto.idMarca),
                            Categoria.findByPk(producto.idCategoria),
                            UrlImangen.findAll({
                                where: { idProducto: producto.id }
                            })
                        ]);

                        let imagenesFirmadas = [];
                        for (const imagen of imagenes) {
                            const url = await obtenerUrlFirmada(imagen.nombre);
                            imagenesFirmadas.push({ nombre: imagen.nombre, url: url });
                        }

                        return {
                            id: producto.id,
                            nombre: producto.nombre,
                            precio: producto.precio,
                            marca: marca ? marca : null,
                            categoria: categoria ? categoria: null,
                            url_imagenes: imagenesFirmadas
                        };
                    }))
                         

                    return res.json({productos:productosConDetallesCategoria});

                case 'Producto':
                    const productosPorNombre = await Producto.findAll({
                        where: {
                            nombre: {
                                [Op.iRegexp]: nombre
                            }
                        }
                    });
                    const productosConDetalles = await Promise.all(productosPorNombre.map(async (producto) => {
                        // Obtener la marca y la categoría
                        const [marca, categoria, imagenes] = await Promise.all([
                            Marca.findByPk(producto.idMarca),
                            Categoria.findByPk(producto.idCategoria),
                            UrlImangen.findAll({
                                where: { idProducto: producto.id }
                            })
                        ]);

                        let imagenesFirmadas = [];
                        for (const imagen of imagenes) {
                            const url = await obtenerUrlFirmada(imagen.nombre);
                            imagenesFirmadas.push({ nombre: imagen.nombre, url: url });
                        }

                        return {
                            id: producto.id,
                            nombre: producto.nombre,
                            precio: producto.precio,
                            marca: marca ? marca : null,
                            categoria: categoria ? categoria: null,
                            url_imagenes: imagenesFirmadas
                        };
                    }))
                            
                            
                    return res.json({productos: productosConDetalles });
                    
                case 'Disponibilidad':
                    // Aquí puedes agregar la lógica para la disponibilidad
                    break;

                default:
                    return res.status(400).json({ error: 'Tipo de búsqueda no válido' });
            }
        } else {
            return res.status(400).json({ error: 'Faltan parámetros de búsqueda' });
        }
    } catch (error) {
        await manejoErrores(error, res, 'Producto');
    }
};



//aunque seria de ver bien la integradidad sino mejor evitarnos esto y cambiar de estadp
const eliminarProducto = async (req, res) => {
        const { id } = req.params;
  
    try {
      const producto = await Producto.findByPk(id);
  
      if (!producto) {
        return res.status(404).json({ ok: false, mensaje: "producto no encontrada" });
      }
  
      await producto.destroy();
      res.status(200).json({ ok: true, mensaje: "producto eliminada correctamente" });
    } catch (error) {
      await manejoErrores(error, res, "Producto");
    }
}

module.exports = {
    crearProducto,
    obtenerProducto,
    editarProducto,
    filtrarProductos,
    cambiarEstadoActivoProducto,
    obtenerProductosRandom,
    filtrarRegex,
    eliminarProducto
}
const { sequelize } = require("../configs/database.configs");
const Producto = require('../models/producto');
const { manejoErrores } = require("../utils/manejoErrores.utils");
const { subirArchivo, obtenerUrlFirmada } = require("../utils/manejoArchivos.utils");
const crypto = require('crypto');
const UrlImangen = require("../models/imagenProducto");


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
            imagen.name = crypto.randomBytes(16).toString('hex') + '.' + imagen.name.split('.').pop();
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

module.exports = {
    crearProducto
}
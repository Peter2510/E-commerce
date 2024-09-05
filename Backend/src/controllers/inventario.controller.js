const { sequelize } = require("../configs/database.configs");
const Producto = require('../models/producto');
const Inventario = require('../models/inventario');
const Marca = require('../models/marca');
const Categoria = require('../models/categoria');
const UrlImangen = require("../models/imagenProducto");
const { manejoErrores } = require("../utils/manejoErrores.utils");
const { where } = require("sequelize");
const { Op } = require('sequelize');



const ingresoMayorCantidadProducto = async (req, res) => {
    
    try {
        const { id } = req.params;
        const { cantidad } = req.body;


        console.log(id, cantidad, "aaaaa");
        

        // aca se obtiene el elemento y se le agrega mas, verifica si no tiene nada lo crea
        const [inventarioRegistrado, created] = await Inventario.findOrCreate({
            where: { idproducto: id },  
            defaults: { cantidadtotal: cantidad, idestadoinventario: 1, idproducto: id }     
        });
        
        //aca si no estaba creco lo actualiza con el incremento
        if (!created) {
            await inventarioRegistrado.increment('cantidadtotal', { by: cantidad })
            return res.json({ ok: true });
        } else {
            return res.json({ ok: true });
        }
    
    } catch (error) {
           await manejoErrores(error, res, "Inventario");
    }

}


module.exports = {
ingresoMayorCantidadProducto
}
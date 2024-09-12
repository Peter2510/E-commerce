const { sequelize } = require("../configs/database.configs");
const Producto = require('../models/producto');
const Inventario = require('../models/inventario');
const RegistroInventario = require('../models/registroInventario');
const EstadoInventario = require('../models/estadoInventario');
const Marca = require('../models/marca');
const Categoria = require('../models/categoria');
const UrlImangen = require("../models/imagenProducto");
const { manejoErrores } = require("../utils/manejoErrores.utils");
const { where } = require("sequelize");
const { Op } = require('sequelize');
const { now } = require("sequelize/lib/utils");
const Usuario = require("../models/usuario");



const ingresoMayorCantidadProducto = async (req, res) => {
    
    try {
        const { id } = req.params;
        const { cantidad } = req.body;

        const minimoInventario = await Producto.findOne({ where: { id: id } });
        let valor = 0;
        //console.log(minimoInventario.dataValues.minimoInventario);
        
        if (minimoInventario.dataValues.minimoInventario < cantidad) {
            valor = 1;
        } else if (minimoInventario.dataValues.minimoInventario >= cantidad && cantidad > 0) {
            valor = 3;
            
        } else {
            valor = 2;

        }
        //console.log(valor);
        
        // aca se obtiene el elemento y se le agrega mas, verifica si no tiene nada lo crea
        const [inventarioRegistrado, created] = await Inventario.findOrCreate({
            where: { idproducto: id },  
            defaults: { cantidadtotal: cantidad, idestadoinventario: Number(valor), idproducto: id }     
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




//funcion para ingresar las modificaciiones con usuarios
const ingresoModificacionCantidesUsuarioProducto= async (req, res)  => {
    const t = await sequelize.transaction();

    try {

        const { idproducto, cantidad , id_empleado} = req.body
        


        //crear una tupla en la tabla 
        const nuevoIngreso = await RegistroInventario.create({
            idproducto: idproducto,
            cantidad: cantidad,
            fechaingreso: new Date(),
            id_empleado: id_empleado
        }, { transaction: t });
            //console.log(nuevoIngreso);

        if (nuevoIngreso) {
            //console.log(nuevoIngreso);
            
              await t.commit();
            return res.json({ ok: true });
            
        }
        return res.json({ ok: false });

        
    } catch (error) {
        await t.rollback();

           await manejoErrores(error, res, "registroInventario");
        
    }
}


const obtenerEstadosInventario = async (req, res) => {
    try {
        const todosEstados = await EstadoInventario.findAll();
        if (todosEstados) {
        return res.json({ ok: true, todosEstados });
            
        }
        return res.json({ ok: false });
        
    } catch (error) {
           await manejoErrores(error, res, "estadoinventario");
        
    }
}


const creacionTipoEstadoInventario = async (req, res) => {
      const t = await sequelize.transaction();

    try {

        const { estado } = req.body
        


        //crear una tupla en la tabla 
        const nuevoIngreso = await EstadoInventario.create({
            estado: estado,
        }, { transaction: t });

        if (nuevoIngreso) {
            
              await t.commit();
            return res.json({ ok: true });
            
        }
        return res.json({ ok: false });

        
    } catch (error) {
        await t.rollback();

           await manejoErrores(error, res, "estadoinventario");
        
    }
}


module.exports = {
    ingresoMayorCantidadProducto,
    ingresoModificacionCantidesUsuarioProducto,
    obtenerEstadosInventario,
    creacionTipoEstadoInventario
}
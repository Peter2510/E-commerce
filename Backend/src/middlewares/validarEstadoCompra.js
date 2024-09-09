const EstadoCompra = require("../models/estadoCompra");

const validarCreacionEstadoCompra = async (req, res, next) =>{

    try {
        const { estado } = req.body;
    
        if (!estado) {
        return res.status(400).json({
            ok: false,
            mensaje: "El parámetro estado es requerido",
        });
        }
    
        const estadoCompra = await EstadoCompra.findOne({ where: { estado } });
    
        if (estadoCompra) {
        return res
            .status(400)
            .json({ ok: false, mensaje: "El estado de la compra ya existe" });
        }
        next();
    } catch (error) {
        return res
        .status(500)
        .json({ ok: false, mensaje: "Error interno del servidor" });
    }

}



const validarEstadoCompraPost = async (req, res, next) =>{
    try {
        const { idEstadoCompra } = req.body;
    
        if (!idEstadoCompra || isNaN(idEstadoCompra)) {
        return res.status(400).json({
            ok: false,
            mensaje:
            "El parámetro idEstadoCompra es requerido y debe ser un número válido",
        });
        }
    
        const estadoCompra = await EstadoCompra.findOne({
        where: { id: idEstadoCompra },
        });
    
        if (!estadoCompra) {
        return res
            .status(404)
            .json({ ok: false, mensaje: "El estado de la compra no existe" });
        }
        next();
    } catch (error) {
        return res
        .status(500)
        .json({ ok: false, mensaje: "Error interno del servidor" });
    }
}

const validarEstadoCompraGet = async (req, res, next) =>{
    try {
        const { idEstadoCompra } = req.params;
    
        if (!idEstadoCompra || isNaN(idEstadoCompra)) {
        return res.status(400).json({
            ok: false,
            mensaje:
            "El parámetro idEstadoCompra es requerido y debe ser un número válido",
        });
        }
    
        const estadoCompra = await EstadoCompra.findOne({
        where: { id: idEstadoCompra },
        });
    
        if (!estadoCompra) {
        return res
            .status(404)
            .json({ ok: false, mensaje: "El estado de la compra no existe" });
        }
        next();
    } catch (error) {
        return res
        .status(500)
        .json({ ok: false, mensaje: "Error interno del servidor" });
    }
}

module.exports = { validarEstadoCompraPost, validarEstadoCompraGet, validarCreacionEstadoCompra };
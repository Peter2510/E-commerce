const FormaPago = require('../models/formaPago');
const TipoUsuario = require('../models/tipoUsuario');

const getTipoUsuarios = async (req, res) => {
    try {
        const users = await TipoUsuario.findAll({
            attributes: ['id', 'tipo'],
            order: [
                ['id', 'ASC']
            ]
        });
        res.status(400).json({estado:'ok', tipoUsuarios: users});
    } catch (error) {
        console.log(error);
        res.status(500).json({ estado:'error',mensaje:'Error al obtener tipo de usuario' });
    }
}

const crearTipoUsuario = async (req, res) => {
    try {
        const { tipo } = req.body;

        const newUser = await TipoUsuario.create({ tipo });
        res.status(200).json({estado:'ok', mensaje:'Tipo de usuario creado correctamente'});


    } catch (error) {
        
        const respuesta = await manejoErrores(error, res ,'Tipo de usuario');

    }
}

const crearFormaPago = async (req, res) => {
    try {
        const { tipo } = req.body;

        const newType = await FormaPago.create({ tipo });
        res.status(200).json({estado:'ok', mensaje:'Forma de pago creado correctamente'});
    }
    catch (error) {
        const respuesta = await manejoErrores(error, res ,'Forma de pago');
        
    }
}

const getFormasPago = async (req, res) => {
    try {
        const users = await FormaPago.findAll({
            attributes: ['id', 'tipo'],
            order: [
                ['id', 'ASC']
            ]
        });
        res.status(200).json({estado:'ok', formaPagos: users});
    } catch (error) {
        console.log(error);
        res.status(500).json({ estado:'error',mensaje:'Error al obtener formas de pago' });
    }
}

async function manejoErrores(error, res, tabla) {

    if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ estado:'error',mensaje:`${tabla} ya existe` });
    }else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ estado:'error',mensaje:`${tabla} no puede ser vacio` });
    }else if (error.name === 'SequelizeDatabaseError') {
        res.status(500).json({ estado:'error',mensaje:`Error al crear ${tabla}` });
    } else {
        res.status(500).json({ estado:'error',mensaje:`Error al crear ${tabla}` });
    }

}


module.exports = {
    getTipoUsuarios,
    crearTipoUsuario,
    crearFormaPago,
    getFormasPago
}

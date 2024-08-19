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

        if (!tipo) {
            res.status(500).json({ estado:'error',mensaje:'Tipo de usuario no puede ser vacio' });
        }

        if (tipo.length < 1) {
            res.status(500).json({ estado:'error',mensaje:'Tipo de usuario no puede ser vacio' });
        }

        const newUser = await TipoUsuario.create({ tipo });
        res.status(200).json({estado:'ok', mensaje:'Tipo de usuario creado correctamente'});


    } catch (error) {
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(500).json({ estado:'error',mensaje:'Tipo de usuario ya existe' });
        }else if (error.name === 'SequelizeValidationError') {
            res.status(500).json({ estado:'error',mensaje:'Tipo de usuario no puede ser vacio' });
        }else if (error.name === 'SequelizeDatabaseError') {
            res.status(500).json({ estado:'error',mensaje:'Error al crear tipo de usuario' });
        } else {
            res.status(500).json({ estado:'error',mensaje:'Error al crear tipo de usuario' });
        }

    }
}

const crearFormaPago = async (req, res) => {
    try {
        const { tipo } = req.body;

        if (!tipo) {
            res.status(500).json({ estado:'error',mensaje:'Forma de pago no puede ser vacio' });
        }

        if (tipo.length < 1) {
            res.status(500).json({ estado:'error',mensaje:'Forma de pago no puede ser vacio' });
        }

        const newType = await FormaPago.create({ tipo });
        res.status(200).json({estado:'ok', mensaje:'Forma de pago creado correctamente'});
    }
    catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(500).json({ estado:'error',mensaje:'Forma de pago ya existe' });
        }else if (error.name === 'SequelizeValidationError') {
            res.status(500).json({ estado:'error',mensaje:'Forma de pago no puede ser vacio' });
        }else if (error.name === 'SequelizeDatabaseError') {
            res.status(500).json({ estado:'error',mensaje:'Error al crear la forma de pago' });
        } else {
            res.status(500).json({ estado:'error',mensaje:'Error al crear la forma de pago' });
        }
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
        res.status(400).json({estado:'ok', formaPagos: users});
    } catch (error) {
        console.log(error);
        res.status(500).json({ estado:'error',mensaje:'Error al obtener formas de pago' });
    }
}


module.exports = {
    getTipoUsuarios,
    crearTipoUsuario,
    crearFormaPago,
    getFormasPago
}

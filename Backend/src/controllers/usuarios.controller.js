const TipoUsuario = require('../models/tipoUsuario');

const getTipoUsuarios = async (req, res) => {
    try {
        const users = await TipoUsuario.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const crearTipoUsuario = async (req, res) => {
    try {
        const { tipo } = req.body;
        const newUser = await TipoUsuario.create({ tipo });
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getTipoUsuarios,
    crearTipoUsuario
}

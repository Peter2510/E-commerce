const { manejoErrores } = require("../utils/manejoErrores.utils")
const Permisos= require('../models/permiso')
const PermisosUsuario= require('../models/permisosUsuario')


const obtenerPermisos = async (req, res) => {
    try {
        const permisos = await Permisos.findAll();


    return res.status(200).json({ ok: true, permisos });

    } catch (error) {
        await manejoErrores(error, res, 'tipopermiso');
    }
}






module.exports = {
    obtenerPermisos: obtenerPermisos
}
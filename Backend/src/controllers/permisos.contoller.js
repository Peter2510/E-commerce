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

const guardarPermisos = async (req, res) => {
    try {
        //valores
        const { id } = req.params
        todosPermisos = []

        
    } catch (error) {
        await manejoErrores(error, res, 'tipopermiso');
    }
}




const obtenerPermisosUsuario = async (req, res) => {
    try {
        //valores
        const { id } = req.params
        todosPermisos = []
        
        const permisosUsuario = await PermisosUsuario.findAll(
            {
                where: { id_empleado: id },
        attributes: ['id', 'id_empleado', 'id_permiso']    }
        )

        console.log(permisosUsuario);
        

        for (const tipoPermiso of permisosUsuario) {
            const permisos = await Permisos.findOne(
                {
                    where: { id: tipoPermiso.id_permiso }
                }
            );
            console.log(permisos ,"-------------");
            
            todosPermisos.push(permisos);
        }

    return res.status(200).json({ ok: true, todosTipos: todosPermisos });
        
    } catch (error) {
        await manejoErrores(error, res, 'tipopermiso');
    }
}


module.exports = {
    obtenerPermisos: obtenerPermisos,
    guardarPermisos: guardarPermisos,
    obtenerPermisosUsuario: obtenerPermisosUsuario
}
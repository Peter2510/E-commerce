const { manejoErrores } = require("../utils/manejoErrores.utils")
const Permisos= require('../models/permiso')
const PermisosUsuario= require('../models/permisosUsuario');
const Usuario = require("../models/usuario");
const {sequelize} = require("../configs/database.configs");


const obtenerPermisos = async (req, res) => {
    try {
        const permisos = await Permisos.findAll();


    return res.status(200).json({ ok: true, permisos });

    } catch (error) {
        await manejoErrores(error, res, 'tipopermiso');
    }
}

const guardarPermisos = async (req, res) => {
    //elminar todo para luego crear los que viene
    const t = await sequelize.transaction();

    try {
        const {id} = req.params
        const { permisosUsuarioArray } = req.body
        console.log(id, permisosUsuarioArray,"aaaaa");
        
        //busqueda que exista el usuario 
        const existeUsuario = await Usuario.findOne({
            where:{id: id}, transaction: t
        })
        if (!existeUsuario) {
            await t.rollback();
             return res
                .status(409)
                .json({ok: false, mensaje: "El usuario no existe"});

        }
        //elimina todo del usuario
        await PermisosUsuario.destroy({
                where: {id_empleado: existeUsuario.id}
        });
        //  luego crear todos los nuevos elementos
        for (const elementosNuevos of permisosUsuarioArray) {
            console.log(existeUsuario.id,elementosNuevos.id);
            
            await PermisosUsuario.create({id_empleado: existeUsuario.id,id_permiso:elementosNuevos.id}, {transaction:t});
        }
            await t.commit();

      res.status(200).json({ ok: true, mensaje: "tipopermiso encontrado correctamente" });
    } catch (error) {
        await t.rollback();
        await manejoErrores(error, res, "tipopermiso");
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
    obtenerPermisosUsuario: obtenerPermisosUsuario,
}
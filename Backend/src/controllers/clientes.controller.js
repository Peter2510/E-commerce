const Persona = require('../models/persona');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const crearCliente = async (req,res) =>{
    try {
        
        const { nombreUsuario, contrasenia, persona} = req.body;

        const email = await Persona.findOne({where:{correoElectronico:persona.correoElectronico}});

        if (email) {
            return res.status(409).json({estado:'error', mensaje:'Correo electronico ya registrado'});
        }

        //crea la persona
        const newPersona = await Persona.create(persona);

        //crea el usuario
        const hashedPassword = await bcrypt.hash(contrasenia, 10);       
        await Usuario.create({nombreUsuario, contrasenia:hashedPassword, idPersona:newPersona.id, idTipoUsuario:1});
        
        res.status(200).json({estado:'ok', mensaje:'Cliente creado correctamente'});
        

    } catch (error) {
        
        await manejoErrores(error, res ,'Cliente');
           
    }
}


async function manejoErrores(error, res, tabla) {

    if (error.name === 'SequelizeValidationError') {
        // Extraer mensajes de validación
        const messages = error.errors.map(err => err.message);
    
        res.status(400).json({
          estado: 'error',
          mensaje: messages.join(', ')
        });
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          estado: 'error',
          mensaje: 'El valor para uno de los campos debe ser único.'
        });
      } else if (error.name === 'SequelizeDatabaseError') {
        res.status(500).json({
          estado: 'error',
          mensaje: 'Error en la base de datos: ' + error.message
        });
      } else {
        res.status(500).json({
          estado: 'error',
          mensaje: 'Error interno del servidor: ' + error.message
        });
      }
    

}
module.exports = {
    crearCliente
}
const Persona = require("../models/persona");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const { sequelize } = require("../configs/database.configs");
var jwt = require('jsonwebtoken');
const utilidades = require("../configs/utilidades");
require('dotenv').config();

const crearUsuario = async (req, res) => {
  const t = await sequelize.transaction(); 

  try {
    const { nombreUsuario, contrasenia, idTipoUsuario, persona } = req.body;

    const email = await Persona.findOne({
      where: { correoElectronico: persona.correoElectronico },
      transaction: t,
    });

    if (email) {
      await t.rollback();
      return res
        .status(409)
        .json({ estado: "error", mensaje: "Correo electronico ya registrado" });
    }

    if (!contrasenia) {
      await t.rollback();
      return res
        .status(400)
        .json({ estado: "error", mensaje: "La contraseña es requerida" });
    }

    if (contrasenia.length < 8) {
      await t.rollback();
      return res
        .status(400)
        .json({
          estado: "error",
          mensaje: "La contraseña debe tener al menos 8 caracteres",
        });
    }

    // Se crea la persona
    const newPersona = await Persona.create(persona, { transaction: t });

    // Se crea el usuario
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    await Usuario.create({
      nombreUsuario,
      contrasenia: hashedPassword,
      idPersona: newPersona.id,
      idTipoUsuario,
    }, { transaction: t });

    await t.commit(); 
    res.status(200).json({ estado: "ok", mensaje: "Registrado correctamente" });

  } catch (error) {  
    await t.rollback(); 
    await manejoErrores(error, res, "Usuario");
  }
};


async function manejoErrores(error, res, tabla) {
  
  if (error.name === "SequelizeValidationError") {
    
    // Se extraen mensajes de validación del orm
    const messages = error.errors.map((err) => err.message);

    res.status(400).json({
      estado: "error",
      mensaje: messages.join(", "),
    });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      estado: "error",
      mensaje: "El valor para uno de los campos debe ser único.",
    });
  } else if (error.name === "SequelizeDatabaseError") {
    res.status(500).json({
      estado: "error",
      mensaje: "Error en la base de datos: " + error.message,
    });
  } else {
    res.status(500).json({
      estado: "error",
      mensaje: "Error interno del servidor: " + error.message,
    });
  }
}

const login = async (req, res) => {
  try {
    const { correoElectronico, contrasenia } = req.body;

    const user = await Persona.findOne({
      where: { correoElectronico },
    });
    
    if (!user) {
      res.status(401).json({ estado: "error", mensaje: "Credenciales incorrectas" });
    }

    const usuario = await Usuario.findOne({
      where: { idPersona: user.id },
    });

        //validar si el usuario esta activo
    if (!usuario.activo) {
      res.status(401).json({ estado: "error", mensaje: "Usuario deshabilitado" });
    }

    const contraseniaValida = await bcrypt.compareSync(contrasenia, usuario.contrasenia);

    if (!contraseniaValida) {
      res.status(401).json({ estado: "error", mensaje: "Credenciales incorrectas" });
    }
   

    //validar el a2f si esta activado
    if(usuario.a2fActivo){
      return await utilidades.iniciar(req,res);
    }

    const token = jwt.sign(
      {
        idUsuario: usuario.id,
        idTipoUsuario: usuario.idTipoUsuario,
        nombreUsuario: usuario.nombreUsuario
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" } 
    );
    
      res.status(200)
      .cookie('access_token', token, {
        httpOnly: true, //solo se puede acceder desde el servidor
        maxAge: 1000 * 60 * 60 //1 hora de duración
      }).json({
        estado: "ok",
        mensaje: "Inicio de sesión correcto",
        token
      })
    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      estado: "error",
      mensaje: "Error interno del servidor: " + error.message,
    });
  }
};

module.exports = {
  crearUsuario,
  login
};

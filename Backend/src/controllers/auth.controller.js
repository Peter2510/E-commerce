const Persona = require("../models/persona");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const utilidades = require("../configs/utilidades");
const { manejoErrores } = require('../utils/manejoErrores.utils');
const { sequelize } = require("../configs/database.configs");
require('dotenv').config();


const crearCliente = async (req, res) => {
  const t = await sequelize.transaction(); 

  try {
    const { nombreUsuario, contrasenia, persona } = req.body;

    const email = await Persona.findOne({
      where: { correoElectronico: persona.correoElectronico },
      transaction: t,
    });

    if (email) {
      await t.rollback();
      return res
        .status(409)
        .json({ ok: false, mensaje: "Correo electronico ya registrado" });
    }

    if (!contrasenia) {
      await t.rollback();
      return res
        .status(400)
        .json({ ok: false, mensaje: "La contraseña es requerida" });
    }

    if (contrasenia.length < 8) {
      await t.rollback();
      return res
        .status(400)
        .json({
          ok: false,
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
      idTipoUsuario: 2,
    }, { transaction: t });

    await t.commit(); 
    res.status(200).json({ ok: true, mensaje: "Registrado correctamente" });

  } catch (error) {  
    await t.rollback(); 
    await manejoErrores(error, res, "Usuario");
  }
};

const login = async (req, res) => {
  try {
    const { correoElectronico, contrasenia } = req.body;

    const user = await Persona.findOne({
      where: { correoElectronico },
    });
    
    if (!user) {
      return res.status(401).json({ ok: false, mensaje: "Credenciales incorrectas" });
    }

    const usuario = await Usuario.findOne({
      where: { idPersona: user.id },
    });

        //validar si el usuario esta activo
    if (!usuario.activo) {
      return res.status(401).json({ ok: false, mensaje: "Usuario deshabilitado" });
    }

    const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);

    if (!contraseniaValida) {
      return res.status(401).json({ ok: false, mensaje: "Credenciales incorrectas" });
    }
   

    //validar el a2f si esta activado
    if(usuario.a2fActivo){
      return await utilidades.iniciar(req,res);
    }

    const token = jwt.sign(
      {
        idUsuario: usuario.id,
        idTipoUsuario: usuario.idTipoUsuario,
        nombreUsuario: usuario.nombreUsuario,
        a2fActivo: usuario.a2fActivo,
        nombre: user.nombre,
        direccion: user.direccion,
        fechaCreacion: user.fechaCreacion
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" } 
    );
    
      res.status(200)
      .cookie('token', token, {
        httpOnly: true, //solo se puede acceder desde el servidor
        maxAge: 1000 * 60 * 60 //1 hora de duración
      }).json({
        ok: true,
        a2f: false,
        mensaje: "Inicio de sesión correcto",
        token
      })
    

  } catch (error) {
    console.log(error);
    await manejoErrores(error, res, "Usuario");
  }
};

const logOut = (req, res) => {
  try {
    res.status(200)
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
      })
      .json({
        ok: true,
        mensaje: 'Sesión cerrada correctamente'
      });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al cerrar sesión'
    });
  }
};


module.exports = {
  crearCliente, 
  login, 
  logOut
};

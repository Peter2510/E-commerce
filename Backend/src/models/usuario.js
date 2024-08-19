const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Persona = require('./persona');
const TipoUsuario = require('./tipoUsuario');
const FormaPago = require('./formaPago');

const Usuario = sequelize.define(
  'Usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre de usuario no puede ser nulo',
        },
        notEmpty: {
          msg: 'El nombre de usuario no puede ser vacio',
        },
      },
    },
    contrasenia: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La contraseña no puede ser nula',
        },
        notEmpty: {
          msg: 'La contraseña no puede ser vacia',
        },
      },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    schema: 'usuarios',
    tableName: 'usuario',
  }
);

module.exports = Usuario;

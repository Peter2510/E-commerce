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
      allowNull: false
    },
    contrasenia: {
      type: DataTypes.STRING(60),
      allowNull: false
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

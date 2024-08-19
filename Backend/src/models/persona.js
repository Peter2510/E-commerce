const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const FormaPago = require('./formaPago');
const Usuario = require('./usuario');

const Persona = sequelize.define(
  'Persona',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nit: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: true
    },
    correoElectronico: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ultimoInicioSesion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    schema: 'usuarios',
    tableName: 'persona',
  }
);

module.exports = Persona;

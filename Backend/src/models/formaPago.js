const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Persona = require('./persona');

const FormaPago = sequelize.define(
  'FormaPago',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    schema: 'usuarios',
    tableName: 'formaPago'
  }
);

module.exports = FormaPago;

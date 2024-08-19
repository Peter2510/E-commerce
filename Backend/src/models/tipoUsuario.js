const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Usuario = require('./usuario');

const TipoUsuario = sequelize.define(
  'TipoUsuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'El tipo de usuario no puede ser nulo',
        },
        notEmpty: {
          msg: 'El tipo de usuario no puede ser vacio',
        }
      },
    },
  },
  {
    schema: 'usuarios',
    tableName: 'tipoUsuario',
  }
);

module.exports = TipoUsuario;

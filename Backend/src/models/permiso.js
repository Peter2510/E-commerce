const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const Permiso = sequelize.define(
  'Permiso',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    permiso: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'El permiso no puede ser nulo',
        },
        notEmpty: {
          msg: 'El permiso no puede ser vacio',
        },
      },
    },
  },
  {
    schema: 'usuarios',
    tableName: 'permiso',
  }
);

module.exports = Permiso;

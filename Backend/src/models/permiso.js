const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const Permiso = sequelize.define(
  'tipopermiso',
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
          msg: 'El permiso no puede ser nulo',
        },
        notEmpty: {
          msg: 'El permiso no puede ser vacio',
        },
      },
    },

    tipoarea:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
  
        notEmpty: {
          msg: 'El permiso no puede ser vacio',
        },
      },
    },

  },
  {
    schema: 'permisos',
    tableName: 'tipopermiso',
    timestamps: false, 

  }
);

module.exports = Permiso;

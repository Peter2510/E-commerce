const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Producto = require('./producto');
const Usuario = require('./usuario');

const tienda = sequelize.define(
  "Tienda",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'el  nombre no puede ser nulo'
        },
        notEmpty: {
          msg: 'el  nombre  no puede ser vacio'
        }
      }
      },

            urlLogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'el urlLogo no puede ser nulo'
        },
        notEmpty: {
          msg: 'el urlLogo no puede ser vacio'
        }
      }
      },
            
            
                                direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'la direccion no puede ser nulo'
        },
        notEmpty: {
          msg: 'la direccion  no puede ser vacio'
        }
      }
      },
  },
  {
    schema: "empresa",
      tableName: "tienda",
    timestamps: false, 
    
  }
);

module.exports = tienda;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Producto = require('./producto');

const UrlImangen = sequelize.define(
  'UrlImagen',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre de la imagen no puede ser nula'
        },
        notEmpty: {
          msg: 'El nombre de la imagen no puede estar vacía'
        }
      }
    },
    idProducto:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        notNull: {
        msg: 'El producto no puede ser nulo'
        },
        notEmpty: {
        msg: 'El producto no puede estar vacío'
        }
    },
    references: {
      model: Producto,
      key: 'id'
    }
    }
  },
  {
    schema: 'catalogo',
    tableName: 'imagenProducto'
  }
);

module.exports = UrlImangen;

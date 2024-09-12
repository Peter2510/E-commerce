const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Estadoinventario = require('./estadoInventario');
const Producto = require('./producto');

const inventario = sequelize.define(
  'inventario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idestadoinventario: {
      type: DataTypes.INTEGER,
      allowNull: false,
       references: {
        model: Estadoinventario,
        key: 'id'
      }    
      },
        idproducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
       references: {
        model: Producto,
        key: 'id'
      }    
      },
            cantidadtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'la cantidadtotal no puede ser nulo'
        },
        notEmpty: {
          msg: 'la cantidadtotal no puede ser vacio'
        }
      }
    },
  },
  {
    schema: 'inventario',
      tableName: 'inventario',
    timestamps: false, 
    
  }
);

module.exports = inventario;

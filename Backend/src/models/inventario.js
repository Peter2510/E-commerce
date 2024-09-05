const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const FormaPago = sequelize.define(
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
      validate: {
        notNull: {
          msg: 'El idestadoinventario no puede ser nulo'
        },
        notEmpty: {
          msg: 'El idestadoinventario no puede ser vacio'
        }
      }
      },
        idproducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El idproducto no puede ser nulo'
        },
        notEmpty: {
          msg: 'El idproducto no puede ser vacio'
        }
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

module.exports = FormaPago;

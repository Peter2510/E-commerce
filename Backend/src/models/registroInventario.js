const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Producto = require('./producto');
const Usuario = require('./usuario');

const registroInventario = sequelize.define(
  'registroinventario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idproducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
       references: {
        model: Producto,
        key: 'id'
      }    
      },

            cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'la cantidad no puede ser nulo'
        },
        notEmpty: {
          msg: 'la cantidad no puede ser vacio'
        }
      }
      },
            
            
                                fechaingreso: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'la fecha no puede ser nulo'
        },
        notEmpty: {
          msg: 'la fecha  no puede ser vacio'
        }
      }
      },
                    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
       references: {
        model: Usuario,
        key: 'id'
      }    
      },
  },
  {
    schema: 'inventario',
      tableName: 'registroinventario',
    timestamps: false, 
    
  }
);

module.exports = registroInventario;

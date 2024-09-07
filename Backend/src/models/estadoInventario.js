const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const estadoinventario = sequelize.define(
  'estadoinventario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        notNull: {
          msg: 'El tipo de forma de estado de inventario no puede ser nulo'
        },
        notEmpty: {
          msg: 'El tipo de forma de estado de inventario  no puede ser vacio'
        }
      }
    },
  },
  {
    schema: 'inventario',
      tableName: 'estadoinventario',
    timestamps: false, 
    
  }
);

module.exports = estadoinventario;

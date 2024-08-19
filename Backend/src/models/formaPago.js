const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

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
      unique: true, 
      validate: {
        notNull: {
          msg: 'El tipo de forma de pago no puede ser nulo'
        },
        notEmpty: {
          msg: 'El tipo de forma de pago no puede ser vacio'
        }
      }
    },
  },
  {
    schema: 'usuarios',
    tableName: 'formaPago'
  }
);

module.exports = FormaPago;

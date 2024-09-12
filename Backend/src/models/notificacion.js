const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Producto = require('./producto');

const Notificacion = sequelize.define(
  'Notificacion',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El mensaje no puede ser nulo' },
        notEmpty: { msg: 'El mensaje no puede estar vacío' },
      },
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: 'id',
      },
    },
  },
  {
    schema: 'notificaciones',
    tableName: 'notificacion',
    timestamps: true,
  }
);

module.exports = Notificacion;
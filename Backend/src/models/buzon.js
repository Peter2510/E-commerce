const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Usuario = require('./usuario');
const Notificacion = require('./notificacion');

const Buzon = sequelize.define(
  'Buzon',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    notificacionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Notificacion,
        key: 'id',
      },
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id',
      },
    },
    leido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Valor por defecto para fecha
    },
  },
  {
    schema: 'notificaciones',
    tableName: 'buzon',
    timestamps: true, // Agrega esto si quieres que Sequelize maneje createdAt y updatedAt automáticamente
  }
);

Buzon.belongsTo(Notificacion, { foreignKey: 'notificacionId', as: 'notificacion' });


module.exports = Buzon;
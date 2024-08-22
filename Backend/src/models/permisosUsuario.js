const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const PermisoUsuario = sequelize.define(
  'PermisoUsuario',
  {
    id_empleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
      
    },
    id_permiso: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
      
    },
  },
  {
    schema: 'permisos',
    tableName: 'permisousuario',
  }
);

module.exports = PermisoUsuario;

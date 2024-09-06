const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Permiso = require('./permiso');
const Usuario = require('./usuario');

const PermisoUsuario = sequelize.define(
  'PermisoUsuario',
  {
    id_empleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
       references: {
        model: Usuario,
        key: 'id'
      }  
      
    },
    id_permiso: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
       references: {
        model: Permiso,
        key: 'id'
      }     
    },
  },
  {
    schema: 'permisos',
    tableName: 'permisousuario',
    timestamps: false, 

  }
);

module.exports = PermisoUsuario;

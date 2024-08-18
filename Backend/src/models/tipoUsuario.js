const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const TipoUsuario = sequelize.define(
  'TipoUsuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    schema: 'usuarios',
    tableName: 'tipoUsuario',
  }
);

sequelize.sync()
  .then(() => {
    console.log('Tabla `tipoUsuario` en el esquema `usuarios` sincronizada con la base de datos.');
  });

module.exports = TipoUsuario;

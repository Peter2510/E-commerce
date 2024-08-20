const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database.configs");
const Persona = require("./persona");
const TipoUsuario = require("./tipoUsuario");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre de usuario no puede ser nulo",
        },
        notEmpty: {
          msg: "El nombre de usuario no puede ser vacio",
        },
      },
    },
    contrasenia: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: {
          msg: "La contraseña no puede ser nula",
        },
        notEmpty: {
          msg: "La contraseña no puede ser vacia",
        },
      },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    a2fActivo:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    idPersona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La persona no puede ser nula",
        },
        notEmpty: {
          msg: "La persona no puede ser vacia",
        },
      },
      references: {
        model: Persona,
        key: "id",
      },
    },
    idTipoUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El tipo de usuario no puede ser nulo",
        },
        notEmpty: {
          msg: "El tipo de usuario no puede ser vacio",
        },
      },
      references: {
        model: TipoUsuario,
        key: "id",
      },
    },
  },
  {
    schema: "usuarios",
    tableName: "usuario",
  }
);

module.exports = Usuario;

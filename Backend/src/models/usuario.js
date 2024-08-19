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
    idPersona: {
      type: DataTypes.INTEGER,
      references: {
        model: Persona,
        key: "id",
      },
    },
    idTipoUsuario: {
      type: DataTypes.INTEGER,
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

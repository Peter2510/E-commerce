const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database.configs");
const Usuario = require("./usuario");
const FormaPago = require("./formaPago");
const EstadoCompra = require("./estadoCompra");

const Compra = sequelize.define(
  "Compra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nit: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nit no puede ser nulo",
        },
        notEmpty: {
          msg: "El nit no puede estar vacio",
        },
      },
    },
    "precioTotal": {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El total no puede ser nulo",
        },
        notEmpty: {
          msg: "El total no puede estar vacio",
        },
        min: 0.0
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    recargo: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        notNull: {
          msg: "El recargo no puede ser nulo",
        },
        notEmpty: {
          msg: "El recargo no puede estar vacio",
        },
      },
      min: 0.0
    },
    "direccionEntrega": {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: "La direccion de entrega no puede ser nulo",
        },
        notEmpty: {
          msg: "La direccion de entrega no puede estar vacio",
        },
      },
    },
    "idUsuario": {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El idUsuario no puede ser nulo",
        },
        notEmpty: {
          msg: "El idUsuario no puede estar vacio",
        },
      },
      references: {
        model: Usuario,
        key: "id",
      },
    },
    "idFormaEntrega": {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El idFormaEntrega no puede ser nulo",
        },
        notEmpty: {
          msg: "El idFormaEntrega no puede estar vacio",
        },
      },
      references: {
        model: FormaPago,
        key: "id",
      },
    },
    "idEstadoCompra": {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notNull: {
          msg: "El idEstadoCompra no puede ser nulo",
        },
        notEmpty: {
          msg: "El idEstadoCompra no puede estar vacio",
        },
      },
      references: {
        model: EstadoCompra,
        key: "id",
      },
    },
  },
  {
    schema: "compras",
    tableName: "compra",
  }
);


module.exports = Compra;

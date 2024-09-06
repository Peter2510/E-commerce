const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database.configs");

const DetalleCompra = sequelize.define(
  "DetalleCompra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    "cantidadProducto": {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La cantidad del producto no puede ser nulo",
        },
        notEmpty: {
          msg: "La cantidad del producto no puede estar vacio",
        },
      },
    },
    "precioUnitario": {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El precio unitario no puede ser nulo",
        },
        notEmpty: {
          msg: "El precio unitario no puede estar vacio",
        },
      },
    },
    "precioTotal": {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El precio total no puede ser nulo",
        },
        notEmpty: {
          msg: "El precio total no puede estar vacio",
        },
      }
    },
    "idCompra": {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El id de la compra no puede ser nulo",
        },
        notEmpty: {
          msg: "El id de la compra no puede estar vacio",
        },
      },
      references: {
        model: "Compra",
        key: "id",
      },
    },
    "idProducto": {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El id del producto no puede ser nulo",
        },
        notEmpty: {
          msg: "El id del producto no puede estar vacio",
        },
      },
      references: {
        model: "Producto",
        key: "id",
      },
    },
  },
  {
    schema: "compras",
    tableName: "detalleCompra",
    hooks: {
      beforeSave: (detalleCompra) => {
        detalleCompra.precioTotal = detalleCompra.cantidadProducto * detalleCompra.precioUnitario;
      },
    },
  }
);



module.exports = DetalleCompra;

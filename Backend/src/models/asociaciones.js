const Producto = require("./producto");
const Marca = require("./marca");
const Categoria = require("./categoria");
const DetalleCompra = require("./detalleCompra");
const Compra = require("./compra");
const Usuario = require("./usuario");
const FormaPago = require("./formaPago");
const EstadoCompra = require("./estadoCompra");

Marca.hasMany(Producto, {
  foreignKey: "idMarca",
  as: "productos",
});

Producto.belongsTo(Marca, {
  foreignKey: "idMarca",
  as: "marca",
});

Categoria.hasMany(Producto, {
  foreignKey: "idCategoria",
  as: "productos",
});

Producto.belongsTo(Categoria, {
  foreignKey: "idCategoria",
  as: "categoria",
});

DetalleCompra.belongsTo(Producto, {
  foreignKey: "idProducto",
  as: "producto",
});

Producto.hasMany(DetalleCompra, {
  foreignKey: "idProducto",
  as: "detalleCompra",
});

EstadoCompra.hasMany(Compra, {
  foreignKey: "idEstadoCompra",
  as: "compras",
});

DetalleCompra.belongsTo(Compra, {
  foreignKey: "idCompra",
  as: "compra",
});

Usuario.hasMany(Compra, {
  foreignKey: "idUsuario",
  as: "compras",
});

FormaPago.hasMany(Compra, {
  foreignKey: "idFormaEntrega",
  as: "compras",
});

Compra.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  as: "usuario",
});

Compra.belongsTo(FormaPago, {
  foreignKey: "idFormaEntrega",
  as: "formaPago",
});

Compra.belongsTo(EstadoCompra, {
  foreignKey: "idEstadoCompra",
  as: "estadoCompra",
});

Compra.hasMany(DetalleCompra, {
  foreignKey: "idCompra",
  as: "detalleCompra",
});

const Producto = require("./producto");
const Marca = require("./marca");
const Categoria = require("./categoria");
const DetalleCompra = require("./detalleCompra");
const Compra = require("./compra");
const Usuario = require("./usuario");
const FormaPago = require("./formaPago");
const EstadoCompra = require("./estadoCompra");
const Persona = require("./persona");
const Notificacion = require("./notificacion");

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

Usuario.belongsTo(Persona, {
  foreignKey: "idPersona",
  as: "persona"
});

Persona.hasOne(Usuario, { 
  foreignKey: 'idPersona', 
  as: 'usuarios' 
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

Compra.belongsTo(EstadoCompra, {
  foreignKey: "idEstadoCompra",
  as: "estadoCompra",
});

DetalleCompra.belongsTo(Compra, {
  foreignKey: "idCompra",
  as: "compra",
});

Compra.hasMany(DetalleCompra, {
  foreignKey: "idCompra",
  as: "detalleCompra",
});

Usuario.hasMany(Compra, {
  foreignKey: "idUsuario",
  as: "compras",
});

Compra.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  as: "usuario",
});

FormaPago.hasMany(Compra, {
  foreignKey: "idFormaEntrega",
  as: "compras",
});

Compra.belongsTo(FormaPago, {
  foreignKey: "idFormaEntrega",
  as: "formaEntrega",
});

Notificacion.belongsTo(Producto, { 
  foreignKey: 'productoId',
  as : 'producto'
});

Producto.hasMany(Notificacion, {
   foreignKey: 'productoId',
    as: 'notificaciones'
});


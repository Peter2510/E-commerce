const Producto = require('./producto');
const Marca = require('./marca');
const Categoria = require('./categoria');

Marca.hasMany(Producto, {
    foreignKey: 'idMarca',
    as: 'productos'
});

Producto.belongsTo(Marca, {
    foreignKey: 'idMarca',
    as: 'marca'
});

Categoria.hasMany(Producto, {
    foreignKey: 'idCategoria',
    as: 'productos'
});

Producto.belongsTo(Categoria, {
    foreignKey: 'idCategoria',
    as: 'categoria'
});
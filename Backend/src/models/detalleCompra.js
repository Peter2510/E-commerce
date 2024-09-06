// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../configs/database.configs');

// const DetalleCompra = sequelize.define(
//     "DetalleCompra",
//     {
//         id:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         nombreCategoria:{
//             type:DataTypes.STRING,
//             allowNull: false,
//             validate:{
//                 notNull:{
//                     msg: "El nombre de la categoria no puede ser nulo",
//                 },
//                 notEmpty:{
//                     msg: "El nombe de la categoria no puede estar vacio"
//                 },
//             },
//         },
//         imagen: {
//             type: DataTypes.STRING,
//             allowNull: false, // la imagen no puede ser null
//             validate: {
//                 notNull:{
//                     msg: "La imagen no puede ser nula"
//                 },
//                 notEmpty:{
//                     msg: "la imagen no puede estar vacia"
//                 }
//             }
//           }
//     },
//     {
//         schema: "compras",
//         tableName: "detalleCompra"
//     }
// );

// module.exports = DetalleCompra;
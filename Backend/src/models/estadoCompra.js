const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const EstadoCompra = sequelize.define(
    "EstadoCompra",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        estado:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull:{
                    msg: "El nombre del estado no puede ser nulo",
                },
                notEmpty:{
                    msg: "El nombre del estado no puede estar vacio"
                },
            },
        }
    },
    {
        schema: "compras",
        tableName: "estadoCompra"
    }
);

module.exports = EstadoCompra;
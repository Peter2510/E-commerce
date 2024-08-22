const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const Categoria = sequelize.define(
    "Categoria",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreCategoria:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: "El nombre de la categoria no puede ser nulo",
                },
                notEmpty:{
                    msg: "El nombe de la categoria no puede estar vacio"
                },
            },
        },
    },
    {
        schema: "catalogo",
        tableName: "categoria"
    }
);

module.exports = Categoria;
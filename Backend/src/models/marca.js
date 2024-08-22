const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const Marca = sequelize.define(
    "Marca",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreMarca:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull:{
                    msg: "El nombre de la marca no puede ser nulo",
                },
                notEmpty:{
                    msg:'El nombre de la marca no puede estar vacio',
                },
            },
        },
    },
    {
        schema: "catalogo",
        tableName: "marca"
    }
);

module.exports = Marca;
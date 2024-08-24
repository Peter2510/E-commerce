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
        imagen: {
            type: DataTypes.STRING,
            allowNull: false, // la imagen no puede ser null
            validate: {
                notNull:{
                    msg: "La imagen de la marca no puede ser nula"
                },
                notEmpty:{
                    msg: "la imagen no puede estar vacia"
                }
            }
          }
    },
    {
        schema: "catalogo",
        tableName: "marca"
    }
);

module.exports = Marca;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const PorcentajeRecargo = sequelize.define(
    "PorcentajeRecargo",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        porcentaje:{
            type:DataTypes.DECIMAL(5,2),
            allowNull: false,
            validate:{
                notNull:{
                    msg: "El porcentaje no puede ser nulo",
                },
                notEmpty:{
                    msg: "El porcentaje no puede estar vacio"
                },
            },
        }
    },
    {
        schema: "compras",
        tableName: "porcentajeRecargo"
    }
);

module.exports = PorcentajeRecargo;
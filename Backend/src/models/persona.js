const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const FormaPago = require('./formaPago');


const Persona = sequelize.define(
  'Persona',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre no puede ser nulo',
        },
        notEmpty: {
          msg: 'El nombre no puede ser vacio',
        },
      },
    },
    nit: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: false,
    },
    correoElectronico: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Correo electronico invalido'
        },
        notNull: {
          msg: 'El correo electronico no puede ser nulo',
        },
        notEmpty: {
          msg: 'El correo electronico no puede ser vacio',
        },
      }
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ultimoInicioSesion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    idTipoFormaPago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notNull: {
          msg: 'El tipo de forma de pago no puede ser nulo',
        },
        notEmpty: {
          msg: 'El tipo de forma de pago no puede ser vacio',
        },
      },
      references: {
        model: FormaPago,
        key: 'id'
      }
    },
  },
  {
    schema: 'usuarios',
    tableName: 'persona',
  }
);

module.exports = Persona;

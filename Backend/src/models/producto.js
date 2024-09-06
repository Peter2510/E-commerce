const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Marca = require('./marca');
const Categoria = require('./categoria');

const Producto = sequelize.define(
  'Producto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
          notNull: {
          msg: 'El nombre no puede ser nulo'
          },
          notEmpty: {
          msg: 'El nombre no puede estar vacío'
          }
      }
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La categoria no puede ser nula'
        },
        notEmpty: {
          msg: 'La categoria no puede estar vacía'
        }
      },
      references: {
        model: Categoria,
        key: 'id'
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          notNull: {
          msg: 'La descripción no puede ser nula'
          },
          notEmpty: {
          msg: 'La descripción no puede estar vacía'
          }
      }
    },
    precio: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      validate: {
          notNull: {
          msg: 'El precio no puede ser nulo'
          },
          notEmpty: {
          msg: 'El precio no puede estar vacío'
          }
      }
    },
    minimoInventario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
            msg: 'El minimo de inventario no puede ser nulo'
            },
            notEmpty: {
            msg: 'El minimo de inventario no puede estar vacío'
            }
        }
    },
    idMarca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          notNull: {
          msg: 'La marca no puede ser nula'
          },
          notEmpty: {
          msg: 'La marca no puede estar vacía'
          }
      },
      references: {
        model: Marca,
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    schema: 'catalogo',
    tableName: 'producto'
  }
);

module.exports = Producto;

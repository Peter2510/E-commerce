const { manejoErrores } = require("../utils/manejoErrores.utils");
const { sequelize } = require("../configs/database.configs");
const Compra = require("../models/compra");
const DetalleCompra = require("../models/detalleCompra");
const Producto = require("../models/producto");
const PorcentajeRecargo = require("../models/porcentajeRecargo");
const inventario = require("../models/inventario");

const registrarCompra = async (req, res) => {
  const { idUsuario, nit, direccionEntrega, idFormaEntrega, productos } =
    req.body;
  const t = await sequelize.transaction();

  try {
    // Registrar una compra
    const compra = await Compra.create(
      {
        nit,
        direccionEntrega,
        idFormaEntrega,
        idUsuario,
        precioTotal: 0.0,
      },
      { transaction: t }
    );

    let precioTotal = 0;

    for (let producto of productos) {
      const productoComprar = await Producto.findByPk(producto.id);

      const detalleRegistrado = await DetalleCompra.create({
          cantidadProducto: producto.cantidad,
          precioUnitario: productoComprar.precio,
          precioTotal: producto.cantidad * productoComprar.precio,
          idCompra: compra.id,
          idProducto: producto.id,
        },
        { transaction: t }
      );

      // Dar de baja del inventario
      await inventario.update({
          cantidadtotal: sequelize.literal(
            `cantidadtotal - ${producto.cantidad}`
          ),
        },
        {
          where: {
            idproducto: producto.id,
          },
          transaction: t,
        }
      );

      precioTotal += parseFloat(detalleRegistrado.precioTotal);
    }

    if (idFormaEntrega === 2) {

      const porcentajeRecargo = await PorcentajeRecargo.findOne({
        transaction: t,
      });

      const porcentaje = parseFloat(porcentajeRecargo.porcentaje);
      
      const recargo = precioTotal * (porcentaje / 100);

      await compra.update({ precioTotal, recargo }, { transaction: t });
    } else {
      await compra.update({ precioTotal }, { transaction: t });
    }

    await t.commit();

    res.json({ ok: true, mensaje: "Pedido registrado correctamente" });
  } catch (error) {
    await t.rollback();
    console.log(error);
    await manejoErrores(error, res, "Producto");
  }
};

module.exports = {
  registrarCompra,
};

/**
 *
 * {
 * idUsuario: 1,
 * nit?: nitUsuario | CF,
 * direccionEntrega?: direccionUsuario | nuevaDireccion,
 * idMetodoEntrega: 1
 *  productos: [
 *      {id: 1, cantidad: 23},
 *      {id: 3, cantidad: 2},
 *      {id: 4, cantidad: 34}
 *  ]
 * }
 *
 */

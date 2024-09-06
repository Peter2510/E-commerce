const { manejoErrores } = require("../utils/manejoErrores.utils");
const { sequelize } = require("../configs/database.configs");
const Compra = require("../models/compra");
const DetalleCompra = require("../models/detalleCompra");
const Producto = require("../models/producto");

const registrarCompra = async (req, res) => {
  const { idUsuario, nit, direccionEntrega, idFormaEntrega, productos } =
    req.body;

  try {
    const t = await sequelize.transaction();

    //proceder a registrar una compra

    const compra = await Compra.create(
      {
        nit,
        direccionEntrega,
        idFormaEntrega,
        idUsuario,
      },
      { transaction: t }
    );

    //proceder a registrar un producto en el detalleProducto segun el id registrado antes

    for (let producto of productos) {
      
      const productoComprar = await Producto.findByPk(producto.id);
      
      await DetalleCompra.create({
          cantidadProducto: producto.cantidad,
          precioUnitario: productoComprar.precio,
          precioTotal: producto.precioTotal,
          idCompra: compra.id,
          idProducto: producto.id,
        },{ transaction: t }
      );
    }

    res.json({ ok: true , mensaje: "Pedido registrado correctamente" });
  } catch (error) {
    await t.rollback();
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

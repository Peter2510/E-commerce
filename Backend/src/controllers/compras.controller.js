const { manejoErrores } = require("../utils/manejoErrores.utils");
const { sequelize } = require("../configs/database.configs");
const Compra = require("../models/compra");
const DetalleCompra = require("../models/detalleCompra");
const Producto = require("../models/producto");
const PorcentajeRecargo = require("../models/porcentajeRecargo");
const inventario = require("../models/inventario");
const Usuario = require("../models/usuario");
const Persona = require("../models/persona");
const Marca = require("../models/marca");
const Categoria = require("../models/categoria");
const EstadoCompra = require("../models/estadoCompra");
const FormaPago = require("../models/formaPago");

/*Randy */
const Notificacion = require("../models/notificacion");
const Buzon = require("../models/buzon");
/** */

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

      const detalleRegistrado = await DetalleCompra.create(
        {
          cantidadProducto: producto.cantidad,
          precioUnitario: productoComprar.precio,
          precioTotal: producto.cantidad * productoComprar.precio,
          idCompra: compra.id,
          idProducto: producto.id,
        },
        { transaction: t }
      );

      // Dar de baja del inventario

      /**
       * 
       */

      const inventarioProducto = await inventario.findOne({
        where: { idproducto: producto.id },
        transaction: t
      });

      const nuevaCantidad = inventarioProducto.cantidadtotal - producto.cantidad;

      /**
       * 
       */
      await inventario.update(
        {
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

      /**Funcion de Notificación */
      if (nuevaCantidad < 10) {
        const notificacion = await Notificacion.create(
          {
            mensaje: `El producto ${productoComprar.nombre} tiene pocas unidades disponibles. Cantidad restante: ${nuevaCantidad} unidades`,
            productoId: producto.id
          },
          { transaction: t }
        );

        // Obtener usuarios de tipo administrador y ayudante
        const usuarios = await Usuario.findAll({
          where: {
            idTipoUsuario: [1, 3], // Administrador (1) y Ayudante (3)
          },
          transaction: t,
        });

        // Crear registros en el buzón para cada usuario
        for (const usuario of usuarios) {
          await Buzon.create(
            {
              notificacionId: notificacion.id,
              usuarioId: usuario.id,
              leido: false,
              fecha: new Date() // Fecha actual
            },
            { transaction: t }
          );
        }
      }






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

const obtenerDetalleCompra = async (req, res) => {
  try {
    const { idCompra } = req.params;

    const detalleCompra = await DetalleCompra.findAll({
      attributes: ["cantidadProducto", "precioUnitario", "precioTotal"],
      where: {
        idCompra,
      },
      include: [
        {
          model: Producto,
          as: "producto",
          attributes: ["nombre", "descripcion", "precio"],
          include: [
            {
              model: Marca,
              as: "marca",
              attributes: ["id","nombreMarca"],
            },
            {
              model: Categoria,
              as: "categoria",
              attributes: ["id","nombreCategoria"],
            },
          ],
        },
      ],
    });

    if (!detalleCompra) {
      return res.status(404).json({
        ok: false,
        mensaje: "Detalle de compra no encontrado",
      });
    }

    return res.json({ ok: true, detalleCompra });
  } catch (error) {
    await manejoErrores(error, res, "Detalle de Compra");
  }
};

const obtenerIncludeCompras = () => {
  return [
    {
      model: Usuario,
      as: "usuario",
      attributes: ["id", "nombreUsuario"],
      include: [
        {
          model: Persona,
          as: "persona",
          attributes: ["id", "nombre"],
        },
      ],
    },
    {
      model: EstadoCompra,
      as: "estadoCompra",
      attributes: ["id","estado"],
    },
    {
      model: FormaPago,
      as: "formaEntrega",
      attributes: ["id","tipo"],
    },
  ];
};

const obtenerIncludeComprasConDetalle = () => {
  return [
    {
      model: Usuario,
      as: "usuario",
      attributes: ["id", "nombreUsuario"],
      include: [
        {
          model: Persona,
          as: "persona",
          attributes: ["id", "nombre"],
        },
      ],
    },
    {
      model: EstadoCompra,
      as: "estadoCompra",
      attributes: ["id","estado"],
    },
    {
      model: FormaPago,
      as: "formaEntrega",
      attributes: ["id","tipo"],
    },
    {
      model: DetalleCompra,
      as: "detalleCompra",
      attributes: ["cantidadProducto", "precioUnitario", "precioTotal"],
      include: [
        {
          model: Producto,
          as: "producto",
          attributes: ["nombre", "descripcion", "precio"],
          include: [
            {
              model: Marca,
              as: "marca",
              attributes: ["id","nombreMarca"],
            },
            {
              model: Categoria,
              as: "categoria",
              attributes: ["id","nombreCategoria"],
            },
          ],
        },
      ],
    },
  ];
};

const obtenerAtributosCompras = () => {
  return ["id", "nit", "precioTotal", "fecha", "recargo", "direccionEntrega"];
};

//todas las compras
const obtenerCompras = async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: obtenerIncludeCompras(),
      attributes: obtenerAtributosCompras(),
    });

    res.json({ ok: true, compras });
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

//fuincion para buscar compras
const buscarCompras = async (filtro, res, tipoError) => {
  try {
    const compras = await Compra.findAll({
      include: obtenerIncludeCompras(),
      attributes: obtenerAtributosCompras(),
      where: filtro,
    });

    if (!compras) {
      return res.status(404).json({
        ok: false,
        mensaje: tipoError + " no encontrada(s)",
      });
    }

    return res.json({ ok: true, compras });
  } catch (error) {
    await manejoErrores(error, res, tipoError);
  }
};

//Compra por id de compra

const obtenerCompra = (req, res) => {
  const { idCompra } = req.params;
  buscarCompras({ id: idCompra }, res, "Compra");
};

const obtenerComprasPorUsuario = (req, res) => {
  const { idUsuario } = req.params;
  buscarCompras({ idUsuario }, res, "Compras");
};

const obtenerComprasPorEstado = async (req, res) => {
  try {
    const { idEstadoCompra } = req.params;

    buscarCompras({ idEstadoCompra }, res, "Estado de Compra");
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorUsuarioYEstado = async (req, res) => {
  try {
    const { idUsuario, idEstadoCompra } = req.params;

    buscarCompras({ idUsuario, idEstadoCompra }, res, "Compras");
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorUsuarioYFecha = async (req, res) => {
  try {
    const { idUsuario, fecha } = req.params;

    if (fecha instanceof Date && !isNaN(fecha)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Fecha no válida",
      });
    }

    buscarCompras(
      {
        idUsuario,
        fecha: sequelize.where(
          sequelize.fn("DATE", sequelize.col("fecha")),
          fecha
        ),
      },
      res,
      "Compras"
    );
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorFormaEntrega = async (req, res) => {
  try {
    const { idFormaEntrega } = req.params;

    buscarCompras({ idFormaEntrega }, res, "Forma de Entrega");
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorUsuarioYFormaEntrega = async (req, res) => {
  try {
    const { idUsuario, idFormaEntrega } = req.params;

    buscarCompras({ idUsuario, idFormaEntrega }, res, "Compras");
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorEstadoCompraYFormaEntrega = async (req, res) => {
  try {
    const { idEstadoCompra, idFormaEntrega } = req.params;

    buscarCompras({ idEstadoCompra, idFormaEntrega }, res, "Compras");
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;

    if (fecha instanceof Date && !isNaN(fecha)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Fecha no válida",
      });
    }

    buscarCompras(
      {
        fecha: sequelize.where(
          sequelize.fn("DATE", sequelize.col("fecha")),
          fecha
        ),
      },
      res,
      "Compras"
    );
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorFechaYEstado = async (req, res) => {
  try {
    const { fecha, idEstadoCompra } = req.params;

    if (fecha instanceof Date && !isNaN(fecha)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Fecha no válida",
      });
    }

    buscarCompras(
      {
        fecha: sequelize.where(
          sequelize.fn("DATE", sequelize.col("fecha")),
          fecha
        ),
        idEstadoCompra,
      },
      res,
      "Compras"
    );
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorFechaYFormaEntrega = async (req, res) => {
  try {
    const { fecha, idFormaEntrega } = req.params;

    if (fecha instanceof Date && !isNaN(fecha)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Fecha no válida",
      });
    }

    buscarCompras(
      {
        fecha: sequelize.where(
          sequelize.fn("DATE", sequelize.col("fecha")),
          fecha
        ),
        idFormaEntrega,
      },
      res,
      "Compras"
    );
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerComprasPorFechaYEstadoCompraYFormaEntrega = async (req, res) => {
  try {
    const { fecha, idEstadoCompra, idFormaEntrega } = req.params;

    if (fecha instanceof Date && !isNaN(fecha)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Fecha no válida",
      });
    }

    buscarCompras(
      {
        fecha: sequelize.where(
          sequelize.fn("DATE", sequelize.col("fecha")),
          fecha
        ),
        idEstadoCompra,
        idFormaEntrega,
      },
      res,
      "Compras"
    );
  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
};

const obtenerCompraYDetalleCompra = async (req, res) => {
  try {
    const { idCompra } = req.params;

    const compra = await Compra.findByPk(idCompra, {
      include: obtenerIncludeComprasConDetalle(),
      attributes: obtenerAtributosCompras(),
    });

    return res.json({ ok: true, compra});

  } catch (error) {
    await manejoErrores(error, res, "Compra");
  }
}

const actualizarEstadoCompra = async (req, res) => {
  const { idCompra, idEstadoCompra } = req.body;
  const t = await sequelize.transaction();

  try {
    const compra = await Compra.findByPk(idCompra, { transaction: t });

    await compra.update({ idEstadoCompra }, { transaction: t });

    await t.commit();

    res.json({ ok: true, mensaje: "Estado de compra actualizado" });
  } catch (error) {
    await t.rollback();
    console.log(error);
    await manejoErrores(error, res, "Compra");
  }
}

const crearEstadoCompra = async (req, res) => {
  const { estado } = req.body;
  const t = await sequelize.transaction();

  try {
    const estadoCompra = await EstadoCompra.create(
      { estado },
      { transaction: t }
    );

    await t.commit();

    res.json({ ok: true, mensaje: "Estado de compra creado" });
  } catch (error) {
    await t.rollback();
    console.log(error);
    await manejoErrores(error, res, "Estado de compra");
  }
}



module.exports = {
  registrarCompra,
  obtenerCompras,
  obtenerCompra,
  obtenerComprasPorUsuario,
  obtenerComprasPorEstado,
  obtenerComprasPorUsuarioYEstado,
  obtenerComprasPorUsuarioYFecha,
  obtenerComprasPorFormaEntrega,
  obtenerComprasPorUsuarioYFormaEntrega,
  obtenerComprasPorEstadoCompraYFormaEntrega,
  obtenerComprasPorFecha,
  obtenerComprasPorFechaYEstado,
  obtenerComprasPorFechaYFormaEntrega,
  obtenerComprasPorFechaYEstadoCompraYFormaEntrega,
  obtenerDetalleCompra,
  obtenerCompraYDetalleCompra,
  actualizarEstadoCompra, 
  crearEstadoCompra
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

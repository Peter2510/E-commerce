const { manejoErrores } = require("../utils/manejoErrores.utils");
const { sequelize } = require("../configs/database.configs");

const registrarCompra = async (req, res) => {

    const { idUsuario, nit, direccionEntrega, idFormaEntrega, productos } = req.body

    try {
        const t = await sequelize.transaction();

        //proceder a registrar una compra

        //proceder a registrar un producto en el detalleProducto segun el id registrado antes

        res.json({ message: "Compra registrada correctamente" });

    } catch (error) {
        await t.rollback();
        await manejoErrores(error, res, "Producto");
    }




}

module.exports = {
    registrarCompra
}

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
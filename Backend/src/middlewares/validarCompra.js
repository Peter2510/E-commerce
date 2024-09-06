const { body, validationResult } = require('express-validator');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');
const FormaPago = require('../models/formaPago');

const validarCompra = [
  body('idUsuario')
    .notEmpty().withMessage('El campo del id del usuario es obligatorio'),

  body('idFormaEntrega')
    .isFloat({ gt: 0 }).withMessage('El id de la forma de entrega es obligatorio'),

  body('productos').isArray().withMessage('El campo de los productos debe ser un arreglo')
    .notEmpty().withMessage('El campo de los productos es obligatorio'),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      const formatoError = errors.array().map(error => mensaje = error.msg);

      return res.status(400).json({ ok: false,  mensaje: formatoError });
    }

    try {

      const usuario = await Usuario.findByPk(req.body.idUsuario);
      if (!usuario) {
        return res.status(404).json({ ok: false, mensaje: 'El usuario no existe' });
      }

      if(usuario.estado === 'inactivo'){
        return res.status(400).json({ ok: false, mensaje: 'El usuario se encuentra inactivo' });
      }

      const formaPago = await FormaPago.findByPk(req.body.idFormaEntrega);

      if (!formaPago) {
        return res.status(404).json({ ok: false, mensaje: 'La forma de pago no existe' });
      }

     if(req.body.productos.length === 0){
        return res.status(400).json({ok: false, mensaje: 'No se han seleccionado productos'});
     }

     for (let producto of req.body.productos){

      const buscarProducto = await Producto.findByPk(producto.id);

        if(!buscarProducto){
            return res.status(404).json({ok: false, mensaje: `El producto con id ${producto.id} no existe`});
        }
        
        //validar cantidad de producto a buscar
        const cantidadEnInventario = await inventario.findOne({
            where: {
                idProducto: producto.id
            }
        });

        if(cantidadEnInventario.cantidadtotal < producto.cantidad){
            return res.status(400).json({ok: false, mensaje: `No hay suficiente stock de ${buscarProducto.nombre} en inventario`});
        }
        
     }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, mensaje: 'Error interno del servidor', error: error});
    }
    

  }
];

module.exports = validarCompra;

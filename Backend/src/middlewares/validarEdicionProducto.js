const { body, validationResult } = require('express-validator');
const Marca = require('../models/marca');
const Categoria = require('../models/categoria');

const validarProducto = [
  body('id').notEmpty().withMessage('El campo id es obligatorio').isInt().withMessage('El campo id debe ser un número entero'),
  
  body('nombre')
    .notEmpty().withMessage('El campo nombre es obligatorio'),

  body('precio')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),

  body('descripcion')
    .notEmpty().withMessage('El campo descripción es obligatorio'),

  body('minimoInventario')
    .isInt({ gt: 0 }).withMessage('El mínimo de inventario debe ser un número entero positivo'),

  body('idCategoria')
    .notEmpty().withMessage('El campo categoría es obligatorio').isInt().withMessage('El campo categoría debe ser un número entero'),

  body('idMarca')
    .notEmpty().withMessage('El campo marca es obligatorio').isInt().withMessage('El campo marca debe ser un número entero'),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      const formatoError = errors.array().map(error => mensaje = error.msg);

      return res.status(400).json({ ok: false,  mensaje: formatoError });
    }

    try {

      const marca = await Marca.findByPk(req.body.idMarca);
      if (!marca) {
        return res.status(400).json({ ok: false, mensaje: ['La marca seleccionada no existe'] });
      }

      const categoria = await Categoria.findByPk(req.body.idCategoria);
      if (!categoria) {
        return res.status(400).json({ ok: false, mensaje: ['La categoría seleccionada no existe'] });
      }

      next();
    } catch (error) {
      
      return res.status(500).json({ ok: false, mensaje: ['Error interno del servidor'] });
    }
    

  }
];

module.exports = validarProducto;

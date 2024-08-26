const express = require('express');
const ProductosController = require('../controllers/productos.controller');
const validarProducto = require('../middlewares/validarProducto');
const validarEdicionProducto = require('../middlewares/validarEdicionProducto');


const router = express.Router();
const api = '/api/v1/productos';

// Rutas para la entidad Marca
router.post(`${api}/crearProducto`,validarProducto, ProductosController.crearProducto);
router.get(`${api}/producto/:id`, ProductosController.obtenerProducto);
router.put(`${api}/editarProducto`,validarEdicionProducto, ProductosController.editarProducto);
router.put(`${api}/cambiarEstadoProducto/:id`, ProductosController.cambiarEstadoActivoProducto);
router.get(`${api}/productosRandom/:cantidad`, ProductosController.obtenerProductosRandom);
router.get(`${api}/filtrar`, ProductosController.filtrarProductos);



module.exports = router;

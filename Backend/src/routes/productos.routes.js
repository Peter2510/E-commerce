const express = require('express');
const ProductosController = require('../controllers/productos.controller');
const InventarioController = require('../controllers/inventario.controller');
const validarProducto = require('../middlewares/validarProducto');
const validarEdicionProducto = require('../middlewares/validarEdicionProducto');
const jwtValidacion = require('../middlewares/jwtValidacion');


const router = express.Router();
const api = '/api/v1/productos';

// Rutas para la entidad Marca
router.post(`${api}/crearProducto`,jwtValidacion,validarProducto, ProductosController.crearProducto);
router.get(`${api}/producto/:id`, ProductosController.obtenerProducto);
router.put(`${api}/editarProducto`,validarEdicionProducto, ProductosController.editarProducto);
router.put(`${api}/cambiarEstadoProducto/:id`, ProductosController.cambiarEstadoActivoProducto);
router.get(`${api}/productosRandom/:cantidad`, ProductosController.obtenerProductosRandom);
router.get(`${api}/filtrar`, ProductosController.filtrarProductos);
router.get(`${api}/filtrarRegex`, ProductosController.filtrarRegex);
router.get(`${api}/productos`,  ProductosController.obtenerTodosProductos);
router.get(`${api}/productos-activos`,  ProductosController.productosActivos);
router.get(`${api}/productos-desactivados`,  ProductosController.productosDesactivados);

// pero viola la integridad
router.delete(`${api}/eliminarProducto/:id`, ProductosController.eliminarProducto);

//para inventario
router.put(`${api}/ingresoMayorCantidadProducto/:id`,InventarioController.ingresoMayorCantidadProducto);
router.get(`${api}/obtenerEstadosInventario/`, InventarioController.obtenerEstadosInventario);
router.post(`${api}/ingresoModificacionCantidesUsuarioProducto/`, InventarioController.ingresoModificacionCantidesUsuarioProducto);
router.post(`${api}/creacionTipoEstadoInventario/`, InventarioController.creacionTipoEstadoInventario);






module.exports = router;

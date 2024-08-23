const express = require('express');
const ProductosController = require('../controllers/productos.controller');

const router = express.Router();
const api = '/api/v1/productos';

// Rutas para la entidad Marca
router.post(`${api}/crearProducto`, ProductosController.crearProducto);

module.exports = router;

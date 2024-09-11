const express = require('express');
const TiendaController = require('../controllers/tienda.controller');

const router = express.Router();
const api = '/api/v1/tienda';

// Rutas para la entidad Marca
router.post(`${api}/crearTienda`, TiendaController.creacionEmpresa);
router.get(`${api}/obtenerElementos`, TiendaController.obtenerElementos);
router.put(`${api}/editarEmpresa`, TiendaController.editarEmpresa);
router.get(`${api}/logo/:nombreTienda`, TiendaController.descargarLogoBase64);

module.exports = router;

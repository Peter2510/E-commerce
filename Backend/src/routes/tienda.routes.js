const express = require('express');
const TiendaController = require('../controllers/tienda.controller');

const jwtValidacion = require('../middlewares/jwtValidacion');


const router = express.Router();
const api = '/api/v1/tienda';

// Rutas para la entidad Marca
router.post(`${api}/crearTienda`, TiendaController.creacionEmpresa);
router.get(`${api}/obtenerElementos`, TiendaController.obtenerElementos);



module.exports = router;

const express = require('express');
const MarcaController = require('../controllers/marcas.controller');
const jwtValidacion = require('../middlewares/jwtValidacion');

const router = express.Router();
const api = '/api/v1/marcas';

// Rutas para la entidad Marca
router.post(`${api}/crearMarca`, jwtValidacion, MarcaController.crearMarca);
router.get(`${api}/obtenerMarcas`,  MarcaController.obtenerMarcas);
router.get(`${api}/obtenerMarca/:id`, MarcaController.obtenerMarcaPorId);
router.put(`${api}/actualizarMarca/:id`,jwtValidacion, MarcaController.actualizarMarca);
router.delete(`${api}/eliminarMarca/:id`, jwtValidacion,MarcaController.eliminarMarca);

module.exports = router;

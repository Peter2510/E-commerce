const express = require('express');
const MarcaController = require('../controllers/marcas.controller');

const router = express.Router();
const api = '/api/v1/marcas';

// Rutas para la entidad Marca
router.post(`${api}/crearMarca`, MarcaController.crearMarca);
router.get(`${api}/obtenerMarcas`, MarcaController.obtenerMarcas);
router.get(`${api}/obtenerMarca/:id`, MarcaController.obtenerMarcaPorId);
router.put(`${api}/actualizarMarca/:id`, MarcaController.actualizarMarca);
router.delete(`${api}/eliminarMarca/:id`, MarcaController.eliminarMarca);

module.exports = router;

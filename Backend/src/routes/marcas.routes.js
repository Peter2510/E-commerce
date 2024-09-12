const express = require('express');
const MarcaController = require('../controllers/marcas.controller');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/api/v1/marcas';

// Rutas para la entidad Marca
router.post(`${api}/crearMarca`, validacionJWTAdmin, MarcaController.crearMarca);
router.get(`${api}/obtenerMarcas`, MarcaController.obtenerMarcas);
router.post(`${api}/obtenerMarcasRegex`, MarcaController.obtenerMarcasRegex);

router.get(`${api}/obtenerMarca/:id`, MarcaController.obtenerMarcaPorId);
router.put(`${api}/actualizarMarca/:id`,validacionJWTAdmin, MarcaController.actualizarMarca);
router.delete(`${api}/eliminarMarca/:id`, validacionJWTAdmin,MarcaController.eliminarMarca);

module.exports = router;

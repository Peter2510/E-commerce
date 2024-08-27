const express = require('express');
const AdministracionController = require('../controllers/administracion.controller');
const jwtValidacion = require('../middlewares/jwtValidacion');

const router = express.Router();
const api = '/api/v1/administracion';

router.get(`${api}/getTipoUsuarios`,jwtValidacion, AdministracionController.getTipoUsuarios);
router.post(`${api}/crearTipoUsuario`,jwtValidacion, AdministracionController.crearTipoUsuario);
router.post(`${api}/crearFormaPago`,jwtValidacion ,AdministracionController.crearFormaPago);
router.get(`${api}/getFormasPago`, AdministracionController.getFormasPago);
router.post(`${api}/editarTipoUsuario`, jwtValidacion, AdministracionController.editarTipoUsuario);
router.post(`${api}/editarFormaPago`, jwtValidacion, AdministracionController.editarFormaPago);
router.get(`${api}/obtenerAdminPorId/:id`, jwtValidacion, AdministracionController.obtenerAdminPorId);
router.get(`${api}/obtenerEmpleados`, jwtValidacion, AdministracionController.obtenerEmpleados);
router.post(`${api}/crearAdmin`, jwtValidacion,AdministracionController.crearAdmin);


module.exports = router;
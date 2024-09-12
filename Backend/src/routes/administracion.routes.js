const express = require('express');
const AdministracionController = require('../controllers/administracion.controller');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT.js');
const validarCreacionAdmin = require('../middlewares/validarCreacionAdmin');
const validarCreacionTipoUsuario = require('../middlewares/validarCreacionDeTipoUsuario');

const router = express.Router();
const api = '/api/v1/administracion';

router.get(`${api}/getTipoUsuarios`,validacionJWTAdmin, AdministracionController.getTipoUsuarios);
router.post(`${api}/crearTipoUsuario`,validacionJWTAdmin, validarCreacionTipoUsuario, AdministracionController.crearTipoUsuario);
router.post(`${api}/crearFormaPago`,validacionJWTAdmin ,AdministracionController.crearFormaPago);
router.get(`${api}/getFormasPago`, AdministracionController.getFormasPago);
router.post(`${api}/editarTipoUsuario`, validacionJWTAdmin, AdministracionController.editarTipoUsuario);
router.post(`${api}/editarFormaPago`, validacionJWTAdmin, AdministracionController.editarFormaPago);
router.get(`${api}/obtenerAdminPorId/:id`, validacionJWTAdmin, AdministracionController.obtenerAdminPorId);
router.get(`${api}/obtenerAyudantePorId/:id`,validacionJWTAdmin, AdministracionController.obtenerAyudantePorId);
router.get(`${api}/obtenerEmpleados`, validacionJWTAdmin, AdministracionController.obtenerEmpleados);
router.post(`${api}/crearAdmin`, validacionJWTAdmin, validarCreacionAdmin, AdministracionController.crearAdmin);
router.put(`${api}/darBaja/:id`,  AdministracionController.darBaja);

router.get(`${api}/reporteGeneral`, validacionJWTAdmin,AdministracionController.obtenerReporteEstadisticas);
router.post(`${api}/editarAdmin`, validacionJWTAdmin, AdministracionController.editarAdmin);
router.post(`${api}/actualizarContrasenia-admin`, validacionJWTAdmin, AdministracionController.actualizarContrasenia);
//obtener a2f activo segun id de usuario
router.get(`${api}/obtenerA2F/:id`, validacionJWTAdmin, AdministracionController.obtenerA2F);


module.exports = router;
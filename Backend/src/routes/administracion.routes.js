const express = require('express');
const AdministracionController = require('../controllers/administracion.controller');

const router = express.Router();
const api = '/api/v1/administracion';

router.get(`${api}/getTipoUsuarios`, AdministracionController.getTipoUsuarios);
router.post(`${api}/crearTipoUsuario`, AdministracionController.crearTipoUsuario);
router.post(`${api}/crearFormaPago`, AdministracionController.crearFormaPago);
router.get(`${api}/getFormasPago`, AdministracionController.getFormasPago);
router.post(`${api}/editarTipoUsuario`, AdministracionController.editarTipoUsuario);
router.post(`${api}/editarFormaPago`, AdministracionController.editarFormaPago);
router.get(`${api}/obtenerAdminPorId/:id`, AdministracionController.obtenerAdminPorId);
router.get(`${api}/obtenerEmpleados`, AdministracionController.obtenerEmpleados);



module.exports = router;
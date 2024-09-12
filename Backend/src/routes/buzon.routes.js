const express = require('express');
const router = express.Router();
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');
const buzonController = require('../controllers/buzon.controller');

const api = '/api/v1/buzon';

// Rutas para los controladores
router.get(`${api}/todosMensajes/:idUsuario`, validacionJWTAdmin,  buzonController.obtenerBuzon);
router.post(`${api}/marcarLeido/:idUsuario/:idNotificacion`, validacionJWTAdmin, buzonController.marcarComoLeido);
router.get(`${api}/primeros/:idUsuario`, validacionJWTAdmin, buzonController.obtenerPrimeros);
router.get(`${api}/obtenerLeidos/:idUsuario`, validacionJWTAdmin, buzonController.obtenerLeidos);
router.get(`${api}/obtenerNoLeidos/:idUsuario`, validacionJWTAdmin, buzonController.obtenerNoLeidos);
router.get(`${api}/obtenerNotificacionPorId/:idUsuario/:idNotificacion`, validacionJWTAdmin, buzonController.obtenerNotificacionPorId)
module.exports = router;

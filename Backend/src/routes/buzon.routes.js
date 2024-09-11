const express = require('express');
const router = express.Router();
const jwtValidacion = require('../middlewares/jwtValidacion');
const buzonController = require('../controllers/buzon.controller');

const api = '/api/v1/buzon';

// Rutas para los controladores
router.get(`${api}/todosMensajes/:idUsuario`, buzonController.obtenerBuzon);
router.post(`${api}/marcarLeido/:idUsuario/:idNotificacion`, buzonController.marcarComoLeido);
router.get(`${api}/primeros/:idUsuario`, buzonController.obtenerPrimeros);
router.get(`${api}/obtenerLeidos/:idUsuario`, buzonController.obtenerLeidos);
router.get(`${api}/obtenerNoLeidos/:idUsuario`, buzonController.obtenerNoLeidos);

module.exports = router;

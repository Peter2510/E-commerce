const express = require('express')
const reportesController = require('../controllers/reportes.controller');
const jwtValidacion = require ('../middlewares/jwtValidacion')

const router =  express.Router();
const api = '/api/v1/reportes';

//rutas para los controladores

router.get(`${api}/topUsuariosCompras`, reportesController.obtenerTopUsuarios)
router.get(`${api}/totalCompraUsuario`, reportesController.totalComprasPorUsuario)


module.exports = router;
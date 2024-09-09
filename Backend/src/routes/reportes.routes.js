const express = require('express')
const reportesController = require('../controllers/reportes.controller');
const jwtValidacion = require ('../middlewares/jwtValidacion')

const router =  express.Router();
const api = '/api/v1/reportes';

//rutas para los controladores

router.get(`${api}/topUsuariosCompras`, reportesController.obtenerTopUsuarios)
router.get(`${api}/totalCompraUsuario`, reportesController.totalComprasPorUsuario)
router.get(`${api}/promedioCompraUsuario`, reportesController.promedioCompraPorUsuario)
router.get(`${api}/compraMasAltaYBaja`, reportesController.compraMasAltaYbaja)
router.get(`${api}/formasDeEntrega`, reportesController.comprasPorFormaDeEntrega)
router.get(`${api}/productosMasComprados`, reportesController.productosMasComprados)
router.get(`${api}/marcasMasVendidas`, reportesController.marcasMasVendidas)
router.get(`${api}/CategoriasMasVendidas`, reportesController.categoriasMasVendidas)


module.exports = router;
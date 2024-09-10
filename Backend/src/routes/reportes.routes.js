const express = require('express')
const reportesController = require('../controllers/reportes.controller');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router =  express.Router();
const api = '/api/v1/reportes';

//rutas para los controladores

router.get(`${api}/topUsuariosCompras`, validacionJWTAdmin, reportesController.obtenerTopUsuarios)
router.get(`${api}/totalCompraUsuario`, validacionJWTAdmin, reportesController.totalComprasPorUsuario)
router.get(`${api}/promedioCompraUsuario`,validacionJWTAdmin, reportesController.promedioCompraPorUsuario)
router.get(`${api}/compraMasAltaYBaja`, validacionJWTAdmin, reportesController.compraMasAltaYbaja)
router.get(`${api}/formasDeEntrega`, validacionJWTAdmin, reportesController.comprasPorFormaDeEntrega)
router.get(`${api}/productosMasComprados`,validacionJWTAdmin, reportesController.productosMasComprados)
router.get(`${api}/marcasMasVendidas`, validacionJWTAdmin, reportesController.marcasMasVendidas)
router.get(`${api}/CategoriasMasVendidas`, validacionJWTAdmin, reportesController.categoriasMasVendidas)


module.exports = router;
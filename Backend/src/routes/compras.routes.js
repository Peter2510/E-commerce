const express = require('express');
const comprasController = require('../controllers/compras.controller');
const jwtValidacion = require('../middlewares/jwtValidacion')
const validarCompra = require('../middlewares/validarCompra');

const router = express.Router();
const api = '/api/v1/compras';

router.post(`${api}/registrarCompra`, jwtValidacion, validarCompra,  comprasController.registrarCompra);


module.exports = router;
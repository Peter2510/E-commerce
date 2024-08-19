const express = require('express');
const ClienteController = require('../controllers/clientes.controller');

const router = express.Router();
const api = '/api/v1/clientes';

router.post(`${api}/crearCliente`, ClienteController.crearCliente);



module.exports = router;
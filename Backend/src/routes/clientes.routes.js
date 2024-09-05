const express = require('express');
const ClienteController = require('../controllers/clientes.controller');
const jwtValidacion = require('../middlewares/jwtValidacion');

const router = express.Router();
const api = '/api/v1/cliente';

router.get(`${api}/obtenerClientes`, jwtValidacion, ClienteController.obtenerClientes);
router.get(`${api}/obtenerClientePorId/:id`, jwtValidacion, ClienteController.obtenerClientePorId);
router.post(`${api}/editarCliente`, jwtValidacion, ClienteController.editarCliente);
router.post(`${api}/actualizarContrasenia`, jwtValidacion, ClienteController.actualizarContrasenia);


module.exports = router;
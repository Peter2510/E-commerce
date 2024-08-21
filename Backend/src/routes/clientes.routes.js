const express = require('express');
const ClienteController = require('../controllers/clientes.controller');

const router = express.Router();
const api = '/api/v1/cliente';

router.get(`${api}/obtenerClientes`, ClienteController.obtenerClientes);
router.get(`${api}/obtenerClientePorId/:id`, ClienteController.obtenerClientePorId);
router.post(`${api}/editarCliente`, ClienteController.editarCliente);
router.post(`${api}/actualizarContrasenia`, ClienteController.actualizarContrasenia);


module.exports = router;
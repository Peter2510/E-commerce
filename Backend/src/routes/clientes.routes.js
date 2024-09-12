const express = require('express');
const ClienteController = require('../controllers/clientes.controller');
const {validacionJWTGeneral, validacionJWTAdmin, validacionJWTCliente} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/api/v1/cliente';

router.get(`${api}/obtenerClientes`, validacionJWTAdmin, ClienteController.obtenerClientes);
router.get(`${api}/obtenerClientePorId/:id`, validacionJWTGeneral, ClienteController.obtenerClientePorId);
router.post(`${api}/editarCliente`, validacionJWTCliente, ClienteController.editarCliente);
router.post(`${api}/actualizarContrasenia`, validacionJWTCliente, ClienteController.actualizarContrasenia);


module.exports = router;
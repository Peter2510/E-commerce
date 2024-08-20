const express = require('express');
const UsuarioController = require('../controllers/usuarios.controller');

const router = express.Router();
const api = '/api/v1/usuarios';

router.post(`${api}/crearCliente`, UsuarioController.crearUsuario);
router.post(`${api}/login`,UsuarioController.login);
router.post(`${api}/logOut`,UsuarioController.logOut);

module.exports = router;
const express = require('express');
const UsuarioController = require('../controllers/usuarios.controller');

const router = express.Router();
const api = '/api/v1/usuarios';

router.get(`${api}/getTipoUsuarios`, UsuarioController.getTipoUsuarios);
router.post(`${api}/crearTipoUsuario`, UsuarioController.crearTipoUsuario);
router.post(`${api}/crearFormaPago`, UsuarioController.crearFormaPago);
router.get(`${api}/getFormasPago`, UsuarioController.getFormasPago);




module.exports = router;
const express = require('express');
const UserController = require('../controllers/usuarios.controller');

const router = express.Router();
const api = '/api/v1/usuarios';

router.get(`${api}/getTipoUsuarios`, UserController.getTipoUsuarios);
router.post(`${api}/crearTipoUsuario`, UserController.crearTipoUsuario);
router.post(`${api}/crearFormaPago`, UserController.crearFormaPago);
router.get(`${api}/getFormasPago`, UserController.getFormasPago);




module.exports = router;
const express = require('express');
const UserController = require('../controllers/usuarios.controller');

const router = express.Router();
const api = '/api/v1/usuarios';

router.get(`${api}/getTipoUsuarios`, UserController.getTipoUsuarios);
router.post(`${api}/crearTipoUsuario`, UserController.crearTipoUsuario);


module.exports = router;
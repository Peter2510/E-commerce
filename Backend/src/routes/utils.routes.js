const express = require('express');
const utilidades = require('../configs/utilidades');

const router = express.Router();
const api = '/api/v1/utilidades';

router.post(`${api}/enable-2fa`, utilidades.iniciar);
router.post(`${api}/verify-2fa`, utilidades.verificar);


module.exports = router;
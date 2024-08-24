const express =require('express');
const permisosContoller = require('../controllers/permisos.contoller');

const router = express.Router();
const api = '/api/v1/permisos';


router.get(`${api}/obtenerPermisos`, permisosContoller.obtenerPermisos);
//router.get(`${api}/obtenerPermisosCliente/:id`, '');



module.exports = router;
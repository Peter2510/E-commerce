const express =require('express');
const permisosContoller = require('../controllers/permisos.contoller');
const jwtValidacion = require('../middlewares/jwtValidacion');

const router = express.Router();
const api = '/api/v1/permisos';


router.get(`${api}/obtenerPermisos`, jwtValidacion, permisosContoller.obtenerPermisos);
//router.get(`${api}/obtenerPermisosCliente/:id`, '');



module.exports = router;
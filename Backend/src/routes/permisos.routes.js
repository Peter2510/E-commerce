const express =require('express');
const permisosContoller = require('../controllers/permisos.contoller');
const jwtValidacion = require('../middlewares/jwtValidacion');

const router = express.Router();
const api = '/api/v1/permisos';


router.get(`${api}/obtenerPermisos`, jwtValidacion, permisosContoller.obtenerPermisos);
//router.get(`${api}/obtenerPermisosCliente/:id`, '');
router.get(`${api}/obtenerPermisos`, permisosContoller.obtenerPermisos);
router.post(`${api}/guardarPermisos/:id`, permisosContoller.guardarPermisos);
router.get(`${api}/obtenerPermisosUsuario/:id`, permisosContoller.obtenerPermisosUsuario);
router.post(`${api}/creacionPermisos`, permisosContoller.creacionPermisos);



module.exports = router;
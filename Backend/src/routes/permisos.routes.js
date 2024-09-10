const express =require('express');
const permisosContoller = require('../controllers/permisos.contoller');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/api/v1/permisos';


router.get(`${api}/obtenerPermisos`, permisosContoller.obtenerPermisos);
//router.get(`${api}/obtenerPermisosCliente/:id`, '');
router.post(`${api}/guardarPermisos/:id`, validacionJWTAdmin, permisosContoller.guardarPermisos);
router.get(`${api}/obtenerPermisosUsuario/:id`, validacionJWTAdmin, permisosContoller.obtenerPermisosUsuario);
router.post(`${api}/creacionPermisos`, validacionJWTAdmin, permisosContoller.creacionPermisos);



module.exports = router;
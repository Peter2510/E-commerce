const express = require('express')
const CategoriaController = require("../controllers/categorias.controller");
const {validacionJWTAdmin} = require('../middlewares/validacionJWT.js');

const router = express.Router();
const api = '/api/v1/categorias';

//Rutas para las categorias
router.post(`${api}/crearCategoria`, validacionJWTAdmin,CategoriaController.crearCategoria);
router.get(`${api}/obtenerCategorias`, CategoriaController.obtenerCategorias);
router.get(`${api}/obtenerCategoriasRegex`, CategoriaController.obtenerCategoriasRegex);
router.get(`${api}/obtenerCategoria/:id`, CategoriaController.obtenerCategoriaPorId);
router.put(`${api}/actualizarCategoria/:id`, validacionJWTAdmin, CategoriaController.actualizarCategoria);
router.delete(`${api}/eliminarCategoria/:id`, validacionJWTAdmin,CategoriaController.eliminarCategoria);

module.exports = router;
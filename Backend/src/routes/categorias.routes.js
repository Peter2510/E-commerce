const express = require('express')
const CategoriaController = require("../controllers/categorias.controller");
const jwtValidacion = require('../middlewares/jwtValidacion');

const router = express.Router();
const api = '/api/v1/categorias';

//Rutas para las categorias
router.post(`${api}/crearCategoria`, jwtValidacion,CategoriaController.crearCategoria);
router.get(`${api}/obtenerCategorias`, CategoriaController.obtenerCategorias);
router.get(`${api}/obtenerCategoria/:id`, CategoriaController.obtenerCategoriaPorId);
router.put(`${api}/actualizarCategoria/:id`, jwtValidacion, CategoriaController.actualizarCategoria);
router.delete(`${api}/eliminarCategoria/:id`, jwtValidacion,CategoriaController.eliminarCategoria);

module.exports = router;
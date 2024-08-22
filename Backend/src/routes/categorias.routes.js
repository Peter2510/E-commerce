const express = require('express')
const CategoriaController = require("../controllers/categorias.controller");

const router = express.Router();
const api = '/api/v1/categorias';

//Rutas para las categorias
router.post(`${api}/crearCategoria`, CategoriaController.crearCategoria);
router.get(`${api}/obtenerCategorias`, CategoriaController.obtenerCategorias);
router.get(`${api}/obtenerCategoria/:id`, CategoriaController.obtenerCategoriaPorId);
router.put(`${api}/actualizarCategoria/:id`, CategoriaController.actualizarCategoria);
router.delete(`${api}/eliminarCategoria/:id`, CategoriaController.eliminarCategoria);

module.exports = router;
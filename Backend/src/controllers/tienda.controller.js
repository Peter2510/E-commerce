const { sequelize } = require("../configs/database.configs");
const Producto = require("../models/producto");
const Marca = require("../models/marca");
const Categoria = require("../models/categoria");
const UrlImangen = require("../models/imagenProducto");
const { manejoErrores } = require("../utils/manejoErrores.utils");
const {
  subirArchivo,
  obtenerUrlFirmada,
  eliminarArchivo,
  generarNombreArchivo,
} = require("../utils/manejoArchivos.utils");
const { where } = require("sequelize");
const { Op } = require("sequelize");
const inventario = require("../models/inventario");
const estadoInventario = require("../models/estadoInventario");

const creacionEmpresa = async (req, res) => {
    
}

const obtenerElementos = async (req, res) => {
    
}

module.exports = {
    creacionEmpresa,
    obtenerElementos
}
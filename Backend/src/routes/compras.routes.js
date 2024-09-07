const express = require("express");
const comprasController = require("../controllers/compras.controller");
const jwtValidacion = require("../middlewares/jwtValidacion");
const validarCompra = require("../middlewares/validarCompra");
const {validarExistenciaUsuarioGet} = require("../middlewares/validacionUsuario");
const {validarFormaEntregaGet} = require("../middlewares/validarFormaEntrega");
const {validarEstadoCompraGet} = require("../middlewares/validarEstadoCompra");
const {validarExistenciaCompraGet} = require("../middlewares/validarExistenciaCompra");

const router = express.Router();
const api = "/api/v1/compras";

router.post(`${api}/registrarCompra`,jwtValidacion,validarCompra,comprasController.registrarCompra);

router.get(`${api}/compras`, jwtValidacion, comprasController.obtenerCompras);
router.get(`${api}/Compra/:idCompra`, jwtValidacion, validarExistenciaCompraGet, comprasController.obtenerCompra);

router.get(
  `${api}/ComprasPorEstadoCompra/:idEstadoCompra`,
  jwtValidacion,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorEstado
);

router.get(
  `${api}/ComprasPorFormaEntrega/:idFormaEntrega`,
  jwtValidacion,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorFormaEntrega
);

router.get(
  `${api}/ComprasPorEstadoCompraYFormaEntrega/:idEstadoCompra/:idFormaEntrega`,
  jwtValidacion,
  validarEstadoCompraGet,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorEstadoCompraYFormaEntrega
);

router.get(
  `${api}/ComprasPorFecha/:fecha`,
  jwtValidacion,
  comprasController.obtenerComprasPorFecha
);

router.get(
  `${api}/ComprasPorFechaYEstadoCompra/:fecha/:idEstadoCompra`,
  jwtValidacion,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorFechaYEstado,
);

router.get(
  `${api}/ComprasPorFechaYFormaEntrega/:fecha/:idFormaEntrega`,
  jwtValidacion,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorFechaYFormaEntrega
);

router.get(
  `${api}/ComprasPorFechaYEstadoCompraYFormaEntrega/:fecha/:idEstadoCompra/:idFormaEntrega`,
  jwtValidacion,
  validarFormaEntregaGet,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorFechaYEstadoCompraYFormaEntrega
);

router.get(
  `${api}/ComprasPorUsuario/:idUsuario`,
  jwtValidacion,
  validarExistenciaUsuarioGet,
  comprasController.obtenerComprasPorUsuario
);

router.get(
  `${api}/ComprasPorUsuarioYEstadoCompra/:idUsuario/:idEstadoCompra`,
  jwtValidacion,
  validarExistenciaUsuarioGet,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorUsuarioYEstado
);

router.get(
  `${api}/ComprasPorUsuarioYFecha/:idUsuario/:fecha`,
  jwtValidacion,
  validarExistenciaUsuarioGet,
  comprasController.obtenerComprasPorUsuarioYFecha
);

router.get(
  `${api}/ComprasPorUsuarioYFormaEntrega/:idUsuario/:idFormaEntrega`,
  jwtValidacion,
  validarExistenciaUsuarioGet,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorUsuarioYFormaEntrega
);

module.exports = router;

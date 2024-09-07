const express = require("express");
const comprasController = require("../controllers/compras.controller");
const jwtValidacion = require("../middlewares/jwtValidacion");
const validarCompra = require("../middlewares/validarCompra");
const {validarExistenciaUsuarioGet} = require("../middlewares/validacionUsuario");
const {validarFormaEntregaGet} = require("../middlewares/validarFormaEntrega");
const {validarEstadoCompraGet, validarEstadoCompraPost} = require("../middlewares/validarEstadoCompra");
const {validarExistenciaCompraGet, validarExistenciaCompraPost} = require("../middlewares/validarExistenciaCompra");

const router = express.Router();
const api = "/api/v1/compras";

router.post(`${api}/registrarCompra`,jwtValidacion,validarCompra,comprasController.registrarCompra);

router.get(`${api}/compras`, jwtValidacion, comprasController.obtenerCompras);
router.get(`${api}/Compra/:idCompra`, jwtValidacion, validarExistenciaCompraGet, comprasController.obtenerCompra);

router.get(
  `${api}/comprasPorEstadoCompra/:idEstadoCompra`,
  jwtValidacion,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorEstado
);

router.get(
  `${api}/comprasPorFormaEntrega/:idFormaEntrega`,
  jwtValidacion,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorFormaEntrega
);

router.get(
  `${api}/comprasPorEstadoCompraYFormaEntrega/:idEstadoCompra/:idFormaEntrega`,
  jwtValidacion,
  validarEstadoCompraGet,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorEstadoCompraYFormaEntrega
);

router.get(
  `${api}/comprasPorFecha/:fecha`,
  jwtValidacion,
  comprasController.obtenerComprasPorFecha
);

router.get(
  `${api}/comprasPorFechaYEstadoCompra/:fecha/:idEstadoCompra`,
  jwtValidacion,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorFechaYEstado,
);

router.get(
  `${api}/comprasPorFechaYFormaEntrega/:fecha/:idFormaEntrega`,
  jwtValidacion,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorFechaYFormaEntrega
);

router.get(
  `${api}/comprasPorFechaYEstadoCompraYFormaEntrega/:fecha/:idEstadoCompra/:idFormaEntrega`,
  jwtValidacion,
  validarFormaEntregaGet,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorFechaYEstadoCompraYFormaEntrega
);

router.get(
  `${api}/comprasPorUsuario/:idUsuario`,
  jwtValidacion,
  validarExistenciaUsuarioGet,
  comprasController.obtenerComprasPorUsuario
);

router.get(
  `${api}/comprasPorUsuarioYEstadoCompra/:idUsuario/:idEstadoCompra`,
  jwtValidacion,
  validarExistenciaUsuarioGet,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorUsuarioYEstado
);

router.get(
  `${api}/comprasPorUsuarioYFecha/:idUsuario/:fecha`,
  jwtValidacion,
  validarExistenciaUsuarioGet,
  comprasController.obtenerComprasPorUsuarioYFecha
);

router.get(
  `${api}/comprasPorUsuarioYFormaEntrega/:idUsuario/:idFormaEntrega`,
  jwtValidacion,
  validarExistenciaUsuarioGet,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorUsuarioYFormaEntrega
);

router.get(
  `${api}/detalleCompra/:idCompra`,
  jwtValidacion,
  validarExistenciaCompraGet,
  comprasController.obtenerDetalleCompra
)

router.get(
  `${api}/compraYDetalleCompra/:idCompra`,
  jwtValidacion,
  validarExistenciaCompraGet,
  comprasController.obtenerCompraYDetalleCompra
)

router.patch(
  `${api}/actualizarEstadoCompra`,
  jwtValidacion,
  validarExistenciaCompraPost,
  validarEstadoCompraPost,
  comprasController.actualizarEstadoCompra
);

module.exports = router;

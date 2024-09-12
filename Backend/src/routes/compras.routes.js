const express = require("express");
const comprasController = require("../controllers/compras.controller");
const {validacionJWTGeneral, validacionJWTAdmin, validacionJWTCliente} = require('../middlewares/validacionJWT');
const validarCompra = require("../middlewares/validarCompra");
const {validarExistenciaUsuarioGet} = require("../middlewares/validacionUsuario");
const {validarFormaEntregaGet} = require("../middlewares/validarFormaEntrega");
const {validarEstadoCompraGet, validarEstadoCompraPost, validarCreacionEstadoCompra} = require("../middlewares/validarEstadoCompra");
const {validarExistenciaCompraGet, validarExistenciaCompraPost} = require("../middlewares/validarExistenciaCompra");

const router = express.Router();
const api = "/api/v1/compras";

router.post(`${api}/registrarCompra`,validacionJWTCliente,validarCompra,comprasController.registrarCompra);

router.post(`${api}/crearEstadoCompra`, validacionJWTAdmin, validarCreacionEstadoCompra, comprasController.crearEstadoCompra);

router.get(`${api}/compras`, validacionJWTAdmin, comprasController.obtenerCompras);
router.get(`${api}/Compra/:idCompra`, validacionJWTGeneral, validarExistenciaCompraGet, comprasController.obtenerCompra);

router.get(
  `${api}/comprasPorEstadoCompra/:idEstadoCompra`,
  validacionJWTAdmin,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorEstado
);

router.get(
  `${api}/comprasPorFormaEntrega/:idFormaEntrega`,
  validacionJWTAdmin,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorFormaEntrega
);

router.get(
  `${api}/comprasPorEstadoCompraYFormaEntrega/:idEstadoCompra/:idFormaEntrega`,
  validacionJWTAdmin,
  validarEstadoCompraGet,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorEstadoCompraYFormaEntrega
);

router.get(
  `${api}/comprasPorFecha/:fecha`,
  validacionJWTAdmin,
  comprasController.obtenerComprasPorFecha
);

router.get(
  `${api}/comprasPorFechaYEstadoCompra/:fecha/:idEstadoCompra`,
  validacionJWTAdmin,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorFechaYEstado,
);

router.get(
  `${api}/comprasPorFechaYFormaEntrega/:fecha/:idFormaEntrega`,
  validacionJWTAdmin,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorFechaYFormaEntrega
);

router.get(
  `${api}/comprasPorFechaYEstadoCompraYFormaEntrega/:fecha/:idEstadoCompra/:idFormaEntrega`,
  validacionJWTAdmin,
  validarFormaEntregaGet,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorFechaYEstadoCompraYFormaEntrega
);

router.get(
  `${api}/comprasPorUsuario/:idUsuario`,
  validacionJWTGeneral,
  validarExistenciaUsuarioGet,
  comprasController.obtenerComprasPorUsuario
);

router.get(
  `${api}/comprasPorUsuarioYEstadoCompra/:idUsuario/:idEstadoCompra`,
  validacionJWTGeneral,
  validarExistenciaUsuarioGet,
  validarEstadoCompraGet,
  comprasController.obtenerComprasPorUsuarioYEstado
);

router.get(
  `${api}/comprasPorUsuarioYFecha/:idUsuario/:fecha`,
  validacionJWTGeneral,
  validarExistenciaUsuarioGet,
  comprasController.obtenerComprasPorUsuarioYFecha
);

router.get(
  `${api}/comprasPorUsuarioYFormaEntrega/:idUsuario/:idFormaEntrega`,
  validacionJWTGeneral,
  validarExistenciaUsuarioGet,
  validarFormaEntregaGet,
  comprasController.obtenerComprasPorUsuarioYFormaEntrega
);

router.get(
  `${api}/detalleCompra/:idCompra`,
  validacionJWTGeneral,
  validarExistenciaCompraGet,
  comprasController.obtenerDetalleCompra
)

router.get(
  `${api}/compraYDetalleCompra/:idCompra`,
  validacionJWTGeneral,
  validarExistenciaCompraGet,
  comprasController.obtenerCompraYDetalleCompra
)

router.patch(
  `${api}/actualizarEstadoCompra`,
  validacionJWTAdmin,
  validarExistenciaCompraPost,
  validarEstadoCompraPost,
  comprasController.actualizarEstadoCompra
);

module.exports = router;

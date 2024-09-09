const { manejoErrores } = require("../utils/manejoErrores.utils");
const { sequelize } = require("../configs/database.configs");


const validarCantidad = (query) => {
  // Obtiene el parámetro 'cantidad' de la consulta
  const cantidadParam = query.cantidad;
  
  // Verifica si hay parámetros en la consulta
  const parametros = Object.keys(query);

  // Si hay más de un parámetro o el parámetro no es 'cantidad', devuelve un error
  if (parametros.length > 1 || (parametros.length === 1 && !parametros.includes('cantidad'))) {
      throw new Error("Se espera un parámetro 'cantidad'.");
  }

  // Si el parámetro 'cantidad' está presente, valida y ajusta el límite
  if (cantidadParam !== undefined) {
      // Convierte el parámetro 'cantidad' a un número entero
      const cantidad = parseInt(cantidadParam, 10);

      // Valida que 'cantidad' sea un número entero positivo
      if (!Number.isInteger(cantidad) || cantidad <= 0) {
          throw new Error("El parámetro 'cantidad' debe ser un número entero positivo.");
      }
      
      return cantidad;
  }

  // Devuelve undefined si 'cantidad' no está presente
  return undefined;
};

const obtenerTopUsuarios = async (req, res) => {
  try {
      // Verifica que no haya parámetros adicionales en la solicitud
      const queryParams = req.query;
      if (Object.keys(queryParams).length > 0 && !queryParams.cantidad) {
          return res.status(400).json({
              ok: false,
              mensaje: 'Parámetros no permitidos en la solicitud. Este endpoint solo acepta el parámetro "cantidad".',
          });
      }

      // Valida el parámetro 'cantidad'
      const cantidad = validarCantidad(req.query);

      // Establece un valor por defecto si 'cantidad' no está presente o no es válido
      const cantidadFinal = cantidad !== undefined ? cantidad : 5;

      // Ejecuta la consulta SQL
      const resultados = await sequelize.query(
          `
            SELECT
              c."idUsuario",
              u."nombreUsuario",
              COUNT(*) AS cantidadCompras
            FROM
              compras.compra c
            JOIN
              usuarios.usuario u ON c."idUsuario" = u.id
            GROUP BY
              c."idUsuario", u."nombreUsuario"
            ORDER BY
              cantidadCompras DESC
            LIMIT :cantidad
          `,
          {
              replacements: { cantidad: cantidadFinal },
              type: sequelize.QueryTypes.SELECT
          }
      );

      // Devuelve los resultados en formato JSON
      res.json({
          ok: true,
          mensaje: 'Top usuarios por compras obtenido correctamente',
          data: resultados
      });
  } catch (error) {
      // Manejo de errores
      console.error('Error obteniendo los usuarios:', error);
      await manejoErrores(error, res, "TopUsuarios");
  }
};

const totalComprasPorUsuario = async (req, res) => {
  try {
      // Verifica que no haya parámetros adicionales en la solicitud
      const queryParams = req.query;
      if (Object.keys(queryParams).length > 0 && !queryParams.cantidad) {
          return res.status(400).json({
              ok: false,
              mensaje: 'Parámetros no permitidos en la solicitud. Este endpoint solo acepta el parámetro "cantidad".',
          });
      }

      // Valida el parámetro 'cantidad'
      const cantidad = validarCantidad(req.query);

      // Establece un valor por defecto si 'cantidad' no está presente o no es válido
      const cantidadFinal = cantidad !== undefined ? cantidad : 10;

      // Ejecuta la consulta SQL
      const resultados = await sequelize.query(
          `
            SELECT
              c."idUsuario",
              u."nombreUsuario",
              COUNT(*) AS "numeroCompras",
              SUM(c."precioTotal") AS "totalCompras"
            FROM
              compras.compra c
            JOIN
              usuarios.usuario u ON c."idUsuario" = u.id
            GROUP BY
              c."idUsuario", u."nombreUsuario"
            ORDER BY
              "totalCompras" DESC
            LIMIT :cantidad
          `,
          {
              replacements: { cantidad: cantidadFinal },
              type: sequelize.QueryTypes.SELECT
          }
      );

      // Devuelve los resultados en formato JSON
      res.json({
          ok: true,
          mensaje: 'Total de compras por usuario obtenido correctamente',
          data: resultados
      });
  } catch (error) {
      // Manejo de errores
      console.error('Error obteniendo el total de compras por usuario:', error);
      await manejoErrores(error, res, "TotalComprasPorUsuario");
  }
};

const promedioCompraPorUsuario = async (req, res) => {
  try {
      // Verifica que no haya parámetros adicionales en la solicitud
      const queryParams = req.query;
      if (Object.keys(queryParams).length > 0 && !queryParams.cantidad) {
          return res.status(400).json({
              ok: false,
              mensaje: 'Parámetros no permitidos en la solicitud. Este endpoint solo acepta el parámetro "cantidad".',
          });
      }

      // Valida el parámetro 'cantidad' utilizando la función validarCantidad
      const cantidad = validarCantidad(req.query);

      // Establece un valor por defecto si 'cantidad' no está presente o no es válido
      const cantidadFinal = cantidad !== undefined ? cantidad : 5;

      // Ejecuta la consulta SQL
      const resultados = await sequelize.query(
          `
            SELECT
              c."idUsuario",
              u."nombreUsuario",
              AVG(c."precioTotal") AS "promedioCompra"
            FROM
              compras.compra c
            JOIN
              usuarios.usuario u ON c."idUsuario" = u.id
            GROUP BY
              c."idUsuario", u."nombreUsuario"
            ORDER BY
              "promedioCompra" DESC
            LIMIT :cantidad
          `,
          {
              replacements: { cantidad: cantidadFinal },
              type: sequelize.QueryTypes.SELECT
          }
      );

      // Devuelve los resultados en formato JSON
      res.json({
          ok: true,
          mensaje: 'Promedio de compra por usuario obtenido correctamente',
          data: resultados
      });
  } catch (error) {
      // Manejo de errores
      console.error('Error obteniendo el promedio de compra por usuario:', error);
      await manejoErrores(error, res, "PromedioCompraPorUsuario");
  }
};

const compraMasAltaYbaja = async (req, res) => {
  try {
      // Verifica que no haya parámetros adicionales en la solicitud
      const queryParams = req.query;
      if (Object.keys(queryParams).length > 0) {
          return res.status(400).json({
              ok: false,
              mensaje: 'Parámetros no permitidos en la solicitud. Este endpoint no acepta parámetros.',
          });
      }

      // Ejecuta la consulta SQL
      const resultados = await sequelize.query(
          `
            SELECT
              MIN(c."precioTotal") AS "compraMasBaja",
              MIN(c."fecha") FILTER (WHERE c."precioTotal" = (SELECT MIN("precioTotal") FROM compras.compra)) AS "fechaCompraMasBaja",
              MAX(c."precioTotal") AS "compraMasAlta",
              MAX(c."fecha") FILTER (WHERE c."precioTotal" = (SELECT MAX("precioTotal") FROM compras.compra)) AS "fechaCompraMasAlta",
              MIN(u."nombreUsuario") FILTER (WHERE c."precioTotal" = (SELECT MIN("precioTotal") FROM compras.compra)) AS "usuarioCompraMasBaja",
              MAX(u."nombreUsuario") FILTER (WHERE c."precioTotal" = (SELECT MAX("precioTotal") FROM compras.compra)) AS "usuarioCompraMasAlta"
            FROM
              compras.compra c
            JOIN
              usuarios.usuario u ON c."idUsuario" = u.id
          `,
          {
              type: sequelize.QueryTypes.SELECT
          }
      );

      // Formatea las fechas para incluir solo el día, mes, año, hora y minuto
      resultados.forEach(result => {
        result.fechaCompraMasBaja = result.fechaCompraMasBaja ? result.fechaCompraMasBaja.toISOString().slice(0, 16).replace('T', ' ') : null;
        result.fechaCompraMasAlta = result.fechaCompraMasAlta ? result.fechaCompraMasAlta.toISOString().slice(0, 16).replace('T', ' ') : null;
      });

      // Devuelve los resultados en formato JSON
      res.json({
          ok: true,
          mensaje: 'Compra más alta y más baja obtenidas correctamente, junto con el usuario correspondiente',
          data: resultados
      });
  } catch (error) {
      // Manejo de errores
      console.error('Error obteniendo la compra más alta y más baja:', error);
      await manejoErrores(error, res, "CompraMasAltaYbaja");
  }
};

const comprasPorFormaDeEntrega = async (req, res) => {
  try {
      // Verifica que no haya parámetros adicionales en la solicitud
      const queryParams = req.query;
      if (Object.keys(queryParams).length > 0 && !queryParams.cantidad) {
          return res.status(400).json({
              ok: false,
              mensaje: 'Parámetros no permitidos en la solicitud. Este endpoint solo acepta el parámetro "cantidad".',
          });
      }

      // Valida el parámetro 'cantidad'
      const cantidad = validarCantidad(req.query);

      // Establece un valor por defecto si 'cantidad' no está presente o no es válido
      const cantidadFinal = cantidad !== undefined ? cantidad : 5;

      // Ejecuta la consulta SQL
      const resultados = await sequelize.query(
          `
            SELECT
              f."tipo" AS "formaEntrega",
              COUNT(*) AS "numeroCompras"
            FROM
              compras.compra c
            JOIN
              usuarios."formaPago" f ON c."idFormaEntrega" = f."id"
            GROUP BY
              f."tipo"
            ORDER BY
              "numeroCompras" DESC
            LIMIT :cantidad
          `,
          {
              replacements: { cantidad: cantidadFinal },
              type: sequelize.QueryTypes.SELECT
          }
      );

      // Devuelve los resultados en formato JSON
      res.json({
          ok: true,
          mensaje: 'Compras por forma de entrega obtenidas correctamente',
          data: resultados
      });
  } catch (error) {
      // Manejo de errores
      await manejoErrores(error, res, "ComprasPorFormaEntrega");
  }
};

const productosMasComprados = async (req, res) => {
  try {
    // Verifica que no haya parámetros adicionales en la solicitud
    const queryParams = req.query;
    if (Object.keys(queryParams).length > 0 && !queryParams.cantidad) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Parámetros no permitidos en la solicitud. Este endpoint solo acepta el parámetro "cantidad".',
      });
    }

    // Valida el parámetro 'cantidad'
    const cantidad = validarCantidad(req.query);

    // Establece un valor por defecto si 'cantidad' no está presente o no es válido
    const cantidadFinal = cantidad !== undefined ? cantidad : 5;

    // Ejecuta la consulta SQL
    const resultados = await sequelize.query(
      `
        SELECT
          p."nombre" AS "nombreProducto",
          SUM(dc."cantidadProducto") AS "cantidadVendida",
          SUM(dc."cantidadProducto" * dc."precioUnitario") AS "dineroGenerado"
        FROM
          compras."detalleCompra" dc
        JOIN
          catalogo."producto" p ON dc."idProducto" = p."id"
        GROUP BY
          p."nombre"
        ORDER BY
          "cantidadVendida" DESC
        LIMIT :cantidad
      `,
      {
        replacements: { cantidad: cantidadFinal },
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve los resultados en formato JSON
    res.json({
      ok: true,
      mensaje: 'Productos más comprados obtenidos correctamente',
      data: resultados
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error obteniendo los productos más comprados:', error);
    await manejoErrores(error, res, "ProductosMasComprados");
  }
};


const marcasMasVendidas = async (req, res) => {
  try {
    // Verifica que no haya parámetros adicionales en la solicitud
    const queryParams = req.query;
    if (Object.keys(queryParams).length > 0 && !queryParams.cantidad) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Parámetros no permitidos en la solicitud. Este endpoint solo acepta el parámetro "cantidad".',
      });
    }

    // Valida el parámetro 'cantidad'
    const cantidad = validarCantidad(req.query);

    // Establece un valor por defecto si 'cantidad' no está presente o no es válido
    const cantidadFinal = cantidad !== undefined ? cantidad : 5;

    // Ejecuta la consulta SQL
    const resultados = await sequelize.query(
      `
        SELECT
          m."nombreMarca" AS "nombreMarca",
          SUM(dc."cantidadProducto") AS "cantidadVendida",
          SUM(dc."cantidadProducto" * dc."precioUnitario") AS "dineroGenerado"
        FROM
          compras."detalleCompra" dc
        JOIN
          catalogo."producto" p ON dc."idProducto" = p."id"
        JOIN
          catalogo."marca" m ON p."idMarca" = m."id"
        GROUP BY
          m."nombreMarca"
        ORDER BY
          "cantidadVendida" DESC
        LIMIT :cantidad
      `,
      {
        replacements: { cantidad: cantidadFinal },
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve los resultados en formato JSON
    res.json({
      ok: true,
      mensaje: 'Marcas más vendidas obtenidas correctamente',
      data: resultados
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error obteniendo las marcas más vendidas:', error);
    await manejoErrores(error, res, "MarcasMasVendidas");
  }
};


const categoriasMasVendidas = async (req, res) => {
  try {
    // Verifica que no haya parámetros adicionales en la solicitud
    const queryParams = req.query;
    if (Object.keys(queryParams).length > 0 && !queryParams.cantidad) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Parámetros no permitidos en la solicitud. Este endpoint solo acepta el parámetro "cantidad".',
      });
    }

    // Valida el parámetro 'cantidad'
    const cantidad = validarCantidad(req.query);

    // Establece un valor por defecto si 'cantidad' no está presente o no es válido
    const cantidadFinal = cantidad !== undefined ? cantidad : 5;

    // Ejecuta la consulta SQL
    const resultados = await sequelize.query(
      `
        SELECT
          c."nombreCategoria" AS "nombreCategoria",
          SUM(dc."cantidadProducto") AS "cantidadVendida",
          SUM(dc."cantidadProducto" * dc."precioUnitario") AS "dineroGenerado"
        FROM
          compras."detalleCompra" dc
        JOIN
          catalogo."producto" p ON dc."idProducto" = p."id"
        JOIN
          catalogo."categoria" c ON p."idCategoria" = c."id"
        GROUP BY
          c."nombreCategoria"
        ORDER BY
          "cantidadVendida" DESC
        LIMIT :cantidad
      `,
      {
        replacements: { cantidad: cantidadFinal },
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve los resultados en formato JSON
    res.json({
      ok: true,
      mensaje: 'Categorías más vendidas obtenidas correctamente',
      data: resultados
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error obteniendo las categorías más vendidas:', error);
    await manejoErrores(error, res, "CategoriasMasVendidas");
  }
};




/*
SELECT
    p."nombre" AS "nombreProducto",
    SUM(dc."cantidadProducto") AS "cantidadVendida",
    SUM(dc."cantidadProducto" * dc."precioUnitario") AS "dineroGenerado"
FROM
    compras."detalleCompra" dc
JOIN
    catalogo."producto" p ON dc."idProducto" = p."id"
GROUP BY
    p."nombre"
ORDER BY
    "cantidadVendida" DESC;
    
   
   
   
   SELECT
    m."nombreMarca" AS "nombreMarca",
    SUM(dc."cantidadProducto") AS "cantidadVendida",
    SUM(dc."cantidadProducto" * dc."precioUnitario") AS "dineroGenerado"
FROM
    compras."detalleCompra" dc
JOIN
    catalogo."producto" p ON dc."idProducto" = p."id"
JOIN
    catalogo."marca" m ON p."idMarca" = m."id"
GROUP BY
    m."nombreMarca"
ORDER BY
    "cantidadVendida" DESC;
   
   
   SELECT
    c."nombreCategoria" AS "nombreCategoria",
    SUM(dc."cantidadProducto") AS "cantidadVendida",
    SUM(dc."cantidadProducto" * dc."precioUnitario") AS "dineroGenerado"
FROM
    compras."detalleCompra" dc
JOIN
    catalogo."producto" p ON dc."idProducto" = p."id"
JOIN
    catalogo."categoria" c ON p."idCategoria" = c."id"
GROUP BY
    c."nombreCategoria"
ORDER BY
    "cantidadVendida" DESC;
* */

module.exports = {
    obtenerTopUsuarios,
    totalComprasPorUsuario,
    promedioCompraPorUsuario,
    compraMasAltaYbaja,
    comprasPorFormaDeEntrega,
    productosMasComprados,
    marcasMasVendidas,
    categoriasMasVendidas



};

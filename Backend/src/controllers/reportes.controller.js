const { manejoErrores } = require("../utils/manejoErrores.utils");
const { sequelize } = require("../configs/database.configs");

const obtenerTopUsuarios = async (req, res) => {
    // Obtén el parámetro 'cantidad' del query string
    const cantidadParam = req.query.cantidad;

    // Verifica si hay algún otro parámetro en la consulta
    const parametros = Object.keys(req.query);
    
    // Si hay parámetros distintos de 'cantidad', devuelve un error
    if (parametros.length > 1 || (parametros.length === 1 && cantidadParam === undefined)) {
        return res.status(400).json({ error: "Se espera un parámetro 'cantidad'." });
    }

    // Si el parámetro 'cantidad' está presente, valida y ajusta el límite
    let cantidad = 3;  // Valor por defecto
    
    if (cantidadParam !== undefined) {
        // Convierte el parámetro 'cantidad' a un número
        cantidad = parseInt(cantidadParam);

        // Valida la cantidad
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).json({ error: "El parámetro 'cantidad' debe ser un número positivo." });
        }
    }

    try {
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
                replacements: { cantidad },
                type: sequelize.QueryTypes.SELECT
            }
        );

        // Devuelve los resultados en formato JSON
        res.json(resultados);
    } catch (error) {
        // Manejo de errores
        console.error('Error obteniendo los usuarios:', error);
        await manejoErrores(error, res, "TopUsuarios");
    }
};

//Total compras por usuario

const totalComprasPorUsuario = async (req, res) => {
    try {
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
        `,
        {
          type: sequelize.QueryTypes.SELECT
        }
      );
  
      // Devuelve los resultados en formato JSON
      res.json(resultados);
    } catch (error) {
      // Manejo de errores similar al de compras.controller.js
      console.error('Error obteniendo el total de compras por usuario:', error);
      await manejoErrores(error, res, "TotalComprasPorUsuario");
    }
  };

//Promedio Compra por usuario
//Compra mas Alta y baja
//Compra por forma de pago
//Productos mas comprados
//Marcas mas vendidas
//Categorias mas vendidas

module.exports = {
    obtenerTopUsuarios,
    totalComprasPorUsuario
};

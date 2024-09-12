const manejoErrores = async (error, res, tabla) => {
    let statusCode = 500;
    let mensaje = "Error interno del servidor: " + error.message;
  
    if (error.name === "SequelizeValidationError") {
      // Se extraen mensajes de validación del ORM
      const messages = error.errors.map((err) => err.message);
      statusCode = 400;
      mensaje = messages.join(", ");
    } else if (error.name === "SequelizeUniqueConstraintError") {
      statusCode = 400;
      mensaje = "Campo ya registrado";
    } else if (error.name === "SequelizeDatabaseError") {
      mensaje = "Error en la base de datos: " + error.message;
    } else {
      statusCode = 500;
      mensaje = error.message;
      console.error(error);
    }
  
    return res.status(statusCode).json({
      ok: false,
      mensaje: mensaje,
    });
  }

module.exports = { manejoErrores };
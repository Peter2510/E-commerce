const { sequelize } = require('../configs/database.configs');
const Buzon = require('../models/buzon');
const Notificacion = require('../models/notificacion');
const Producto = require('../models/producto');
const { manejoErrores } = require('../utils/manejoErrores.utils');


// Obtener las notificaciones del buzón del usuario especificado
const obtenerBuzon = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ ok: false, mensaje: 'ID del usuario no definido' });
    }

    const buzones = await Buzon.findAll({
      where: { usuarioId: idUsuario },
      include: {
        model: Notificacion,
        as: 'notificacion',
        include: {
          model: Producto,
          as: 'producto',
        },
      },
      order: [['fecha', 'DESC']],
    });

    res.status(200).json({ ok: true, buzones });
  } catch (error) {
    await manejoErrores(error, res, 'Buzón');
  }
};


const marcarComoLeido = async (req, res) => {
  try {
    const { idUsuario, idNotificacion } = req.params;

    if (!idUsuario || !idNotificacion) {
      return res.status(400).json({ ok: false, mensaje: 'ID del usuario o de la notificación no definido' });
    }

    const [rowsUpdated] = await Buzon.update(
      { leido: true },
      {
        where: { usuarioId: idUsuario, notificacionId: idNotificacion, leido: false },
      }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Notificación no encontrada o ya ha sido leída' });
    }

    res.status(200).json({ ok: true, mensaje: 'Notificación marcada como leída' });
  } catch (error) {
    await manejoErrores(error, res, 'Buzón');
  }
};

const obtenerPrimeros = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ ok: false, mensaje: 'ID del usuario no definido' });
    }

    const buzones = await Buzon.findAll({
      where: { usuarioId: idUsuario },
      include: {
        model: Notificacion,
        as: 'notificacion',
      },
      order: [['fecha', 'DESC']],
      limit: 5,
    });

    res.status(200).json({ ok: true, buzones });
  } catch (error) {
    await manejoErrores(error, res, 'Buzón');
  }
};

const obtenerLeidos = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ ok: false, mensaje: 'ID del usuario no definido' });
    }

    const buzones = await Buzon.findAll({
      where: { usuarioId: idUsuario, leido: true },
      include: {
        model: Notificacion,
        as: 'notificacion',
      },
      order: [['fecha', 'DESC']],
    });

    res.status(200).json({ ok: true, buzones });
  } catch (error) {
    await manejoErrores(error, res, 'Buzón');
  }
};

const obtenerNoLeidos = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ ok: false, mensaje: 'ID del usuario no definido' });
    }

    const buzones = await Buzon.findAll({
      where: { usuarioId: idUsuario, leido: false },
      include: {
        model: Notificacion,
        as: 'notificacion',
      },
      order: [['fecha', 'DESC']],
    });

    res.status(200).json({ ok: true, buzones });
  } catch (error) {
    await manejoErrores(error, res, 'Buzón');
  }
};


const obtenerNotificacionPorId = async (req, res) => {
  try {
    const { idUsuario, idNotificacion } = req.params;

    if (!idUsuario || !idNotificacion) {
      return res.status(400).json({ 
        ok: false, 
        mensaje: 'ID del usuario o de la notificación no definido' });
    }

    // Buscar la notificación en el buzón del usuario autenticado
    const buzon = await Buzon.findOne({
      where: { usuarioId: idUsuario, notificacionId: idNotificacion },
      include: {
        model: Notificacion,
        as: 'notificacion',
        include: {
          model: Producto,
          as: 'producto',
        },
      },
    });

    if (!buzon) {
      return res.status(404).json({ 
        ok: false, 
        mensaje: 'Notificación no encontrada o no asociada a este usuario' });
    }

    res.status(200).json({ 
      ok: true, 
      notificacion: buzon.notificacion });
  } catch (error) {
    await manejoErrores(error, res, 'Notificación');
  }
};




module.exports = {
  obtenerBuzon,
  marcarComoLeido,
  obtenerPrimeros,
  obtenerLeidos,
  obtenerNoLeidos,
  obtenerNotificacionPorId
}

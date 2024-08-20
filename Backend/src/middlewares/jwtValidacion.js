require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtValidacion = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ ok: false, mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.idUsuario = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ ok: false, mensaje: 'Token no válido' });
  }
};

module.exports = jwtValidacion;

const OTPAuth = require("otpauth");
const encode = require("hi-base32");
const QRCode = require('qrcode');

const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken
require('dotenv').config();

// Configuración de caché con un TTL (time-to-live) de 5 minutos
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });


// Endpoint to enable two-way authentication
const iniciar = async (req, res) => {
    const { correoElectronico } = req.body;
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASSWORD
        }
    });

    try {
        const secret = speakeasy.generateSecret();
        const token = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });

        // Almacenar el código y el secreto en caché
        cache.set(correoElectronico, { secret: secret.base32, token });

        const mensaje = `<h1>Tu código es: ${token}</h1>`;

        await transporter.sendMail({
            to: correoElectronico,
            subject: 'Código de verificación',
            html: mensaje
        });

        console.log('Email enviado ', token);
        res.status(200).json({ estado: 'ok', mensaje: 'Código enviado al correo electrónico' });

    } catch (err) {
        console.error('Error al enviar el código de verificación', err);
        res.status(500).json({ estado: 'error', mensaje: 'Error al enviar el código de verificación' });
    }
};



const verificar = async (req, res) => {
    const { correoElectronico, token } = req.body;

    const cachedData = cache.get(correoElectronico);
    if (!cachedData) {
        res.status(401).json({ estado:'error', mensaje: 'Código expirado o no encontrado' });
    }

    const { secret } = cachedData;
    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1
    });

    if (verified) {
        const jwtToken = jwt.sign({ user: correoElectronico }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.json({ estado: 'ok' , token: jwtToken });
    } else {
        res.status(401).json({ estado: 'error', mensaje: 'Código no válido' });
    }
};


module.exports = {
    iniciar: iniciar,
    verificar: verificar
}
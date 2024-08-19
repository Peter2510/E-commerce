const OTPAuth = require("otpauth");
const encode = require("hi-base32");
const QRCode = require('qrcode');

const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken


const configuracion = require('../.env/credenciales')

// Configuración de caché con un TTL (time-to-live) de 5 minutos
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });


// Endpoint to enable two-way authentication
const iniciar =  (req, res) => {
    const {email} = req.body
    const tranportes = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
                auth: {
                    user: configuracion.CORREO,
                    pass: configuracion.PASSWORD
                }
            });


    
        const secret = speakeasy.generateSecret();
    const token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });

    // Almacenar el código y el secreto en caché
    cache.set(email, { secret: secret.base32, token });

    const mensaje =" <h1>Tu codigo es: "+token+"</h1>"

        tranportes.sendMail({
            to: email,
            subject: 'Codigo de verificacion',
            html:mensaje
        }).then(() => {
        console.log('Email enviado ', token);
        g
        }).catch(err => {
            console.log(err);
            
        });
};



const verificar = (req, res) => {
    const { email, token } = req.body;

    const cachedData = cache.get(email);
    if (!cachedData) {
        return res.status(401).json({ verified: false, message: 'Código expirado o no encontrado' });
    }

    const { secret } = cachedData;
    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1
    });

    if (verified) {
        const jwtToken = jwt.sign({ user: email }, 'mi_secreto', { expiresIn: '1h' });
        res.json({ verified: true, token: jwtToken });
    } else {
        res.status(401).json({ verified: false, message: 'Código no válido' });
    }
};


module.exports = {
    iniciar: iniciar,
    verificar: verificar
}
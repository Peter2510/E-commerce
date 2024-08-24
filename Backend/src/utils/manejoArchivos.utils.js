require('dotenv').config();
const fs = require('fs')
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const cliente = require('../configs/clienteS3.configs');
const crypto = require('crypto');


const subirArchivo = async (archivo) => {

    const stream = fs.createReadStream(archivo.tempFilePath)
    archivo.name = crypto.randomBytes(16).toString('hex') + '.' + archivo.name.split('.').pop();

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: archivo.name,
        Body: stream,
        ContentType: archivo.mimetype
    }

    const command = new PutObjectCommand(uploadParams);
    return await cliente.send(command);
    
}

const obtenerUrlFirmada = async (nombreArchivo) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: nombreArchivo
    })
    return await getSignedUrl(cliente, command, { expiresIn: 1800 })
}


const eliminarArchivo = async (nombreArchivo) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: nombreArchivo
    })
    return await cliente.send(command)
}

module.exports = {
    subirArchivo,
    obtenerUrlFirmada,
    eliminarArchivo
}
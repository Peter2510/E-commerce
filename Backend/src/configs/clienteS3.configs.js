const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const cliente = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

module.exports = cliente;

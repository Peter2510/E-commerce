const app = require('./app');
require('dotenv').config();

const PORT = process.env.APP_PORT || 3200;

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})
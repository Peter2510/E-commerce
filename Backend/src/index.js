const {connect} = require("./configs/database.configs");
const app = require('./app');
require('dotenv').config();
connect();

const PORT = process.env.APP_PORT || 3200;

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})
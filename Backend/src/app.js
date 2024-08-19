const express = require('express');
const app = express();
const cors = require('cors');

//Routes
const usuariosRoutes = require('./routes/usuarios.routes');
const adminstracionRoutes = require('./routes/administracion.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});

app.use(usuariosRoutes);
app.use(adminstracionRoutes);

module.exports = app;
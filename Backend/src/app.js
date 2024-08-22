const express = require('express');
const app = express();
const cors = require('cors');
cookieParser = require('cookie-parser');
const jwtValidacion = require('./middlewares/jwtValidacion');

//Routes
const usuariosRoutes = require('./routes/usuarios.routes');
const adminstracionRoutes = require('./routes/administracion.routes');
const utilsroutes = require('./routes/utils.routes');
const marcasRoutes = require('./routes/marcas.routes')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});
app.use(utilsroutes);
app.use(marcasRoutes)

app.use(usuariosRoutes);
app.use(jwtValidacion,adminstracionRoutes);


module.exports = app;
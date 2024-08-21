const express = require('express');
const app = express();
const cors = require('cors');
cookieParser = require('cookie-parser');
const jwtValidacion = require('./middlewares/jwtValidacion');

//Routes
const authRoutes = require('./routes/auth.routes');
const adminstracionRoutes = require('./routes/administracion.routes');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});

app.use(authRoutes);
app.use(jwtValidacion,adminstracionRoutes);

module.exports = app;
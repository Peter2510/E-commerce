const express = require('express');
const app = express();
const cors = require('cors');

//Routes
const utilsroutes = require('./routes/utils.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});
app.use(utilsroutes);

module.exports = app;
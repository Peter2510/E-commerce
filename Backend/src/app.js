const express = require('express');
const app = express();
const cors = require('cors');

//Routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});

module.exports = app;
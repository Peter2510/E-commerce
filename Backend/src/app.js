const express = require('express');
const app = express();
const cors = require('cors');
cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('./models/asociaciones');
const { swaggerUi, swaggerDocs } = require('./swagger.js');

//Routes
const authRoutes = require('./routes/auth.routes');
const adminstracionRoutes = require('./routes/administracion.routes');
const clientesRoutes = require('./routes/clientes.routes');
const productosRoutes = require('./routes/productos.routes');
const marcasRoutes = require('./routes/marcas.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const permisosRoutes = require('./routes/permisos.routes.js');
const comprasRoutes = require('./routes/compras.routes');
const reportesRoutes = require('./routes/reportes.routes.js')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.ORIGIN , credentials:true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './temp/',
    createParentPath: true
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});

app.use(authRoutes);
app.use(productosRoutes);
app.use(categoriasRoutes);
app.use(marcasRoutes);
app.use(adminstracionRoutes);
app.use(clientesRoutes);
app.use(permisosRoutes);
app.use(comprasRoutes);
app.use(reportesRoutes);



module.exports = app;
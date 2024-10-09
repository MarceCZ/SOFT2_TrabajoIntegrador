import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import productoRouter from './src/routes/producto.js';
import usuarioRouter from './src/routes/usuario.js';
import boticaRouter from './src/routes/botica.js';
import kit_productoRouter from './src/routes/kit_producto.js';
import kitRouter from './src/routes/kit.js';
import clienteRouter from './src/routes/cliente.js';
import administradorRouter from './src/routes/administrador.js';
import recetaRouter from './src/routes/receta.js';
import tarjetaRouter from './src/routes/tarjeta.js';
import suscripcionRouter from './src/routes/suscripcion.js'; 





const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ message: "Hello World", code: "201"});
})

app.use('/producto', productoRouter);
app.use('/usuario', usuarioRouter);
app.use('/botica', boticaRouter);
app.use('/kit_producto', kit_productoRouter);
app.use('/kit', kitRouter);
app.use('/cliente', clienteRouter);
app.use('/administrador', administradorRouter);
app.use('/receta', recetaRouter);
app.use('/tarjeta', tarjetaRouter);
app.use('/suscripcion', suscripcionRouter);


export default app;

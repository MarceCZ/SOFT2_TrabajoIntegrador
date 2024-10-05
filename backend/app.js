import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import productoRouter from './src/routes/producto.js';
/*
import clienteRouter from './src/routes/cliente.js';
import usuarioRouter from './src/routes/usuario.js';
import carritoRouter from './src/routes/carritocompras.js';
import ordenRouter from './src/routes/orden.js';
import ordenDetalleRouter from './src/routes/detalleOrden.js';
import serieRouter from './src/routes/serie.js';*/


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ message: "Hello World", code: "201"});
})

app.use('/producto', productoRouter);
/*
app.use('/cliente', clienteRouter);
app.use('/usuario', usuarioRouter);
app.use('/carrito', carritoRouter);
app.use('/orden', ordenRouter);
app.use('/detalleOrden', ordenDetalleRouter);
app.use('/serie', serieRouter);
*/

export default app;

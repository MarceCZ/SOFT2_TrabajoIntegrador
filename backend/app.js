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
import suscripcionRouter from './src/routes/suscripcion.js'; 
import emailRouter from './src/routes/email.js';
import session from 'express-session';


const app = express();
console.log(process.env.POSTMARK_API_TOKEN);

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true // habilitar cookies
}));

app.use(bodyParser.json());


app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto_unico',
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 60 * 60 * 1000, // expiración de la cookie en 1 hora
        secure: false, 
        httpOnly: false,
    }
}));


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
app.use('/suscripcion', suscripcionRouter);
app.use('/email', emailRouter);



export default app;

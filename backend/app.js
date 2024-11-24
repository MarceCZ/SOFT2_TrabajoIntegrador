const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const productoRouter = require('./src/routes/producto');
const usuarioRouter = require('./src/routes/usuario');
const boticaRouter = require('./src/routes/botica');
const kit_productoRouter = require('./src/routes/kit_producto');
const kitRouter = require('./src/routes/kit');
const clienteRouter = require('./src/routes/cliente');
const administradorRouter = require('./src/routes/administrador');
const recetaRouter = require('./src/routes/receta');
const suscripcionRouter = require('./src/routes/suscripcion');
const emailRouter = require('./src/routes/email');

const app = express();
console.log(process.env.POSTMARK_API_TOKEN);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // habilitar cookies
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
    return res.json({ message: "Hello World", code: "201" });
});

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

module.exports = app;


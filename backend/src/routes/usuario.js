import express from 'express';
import controller from '../controllers/usuario.js';

const router = express.Router();

//Ruta principales para el Usuario
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.put('/', controller.update);


//Ruta para Usuarios que son clientes
router.get('/complete', controller.findAllComplete);
router.get('/complete/:id', controller.findOneComplete);

//Ruta para login
router.post('/login', controller.login);

//Ruta apra registrar
router.post('/signin', controller.signin);

export default router;
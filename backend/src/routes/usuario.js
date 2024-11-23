import express from 'express';
import controller from '../controllers/usuario.js';

const router = express.Router();

//Ruta principales para el Usuario

router.get('/', controller.findAll);

//Ruta para Usuarios que son clientes
router.get('/complete', controller.findAllComplete);
router.get('/complete/:id', controller.findOneComplete);

router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.put('/', controller.update);


//Ruta para los usuarios clientes con sus suscripciones y kits
router.get('/usuariokits', controller.findAllCompleteUsuarioKits);

//Ruta para Usuarios que son clientes
router.get('/complete', controller.findAllComplete);
router.get('/complete/:id', controller.findOneComplete);

//Ruta para login
router.post('/login', controller.login);

//Ruta apra registrar
router.post('/signin', controller.signin);

export default router;
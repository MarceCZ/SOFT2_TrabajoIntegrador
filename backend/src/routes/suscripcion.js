import express from 'express';
import controller from '../controllers/suscripcion.js';

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.delete('/', controller.removeAllSubscriptions);
router.put('/', controller.update);

router.post('/create', controller.create);
router.post('/cancel/:id', controller.cancelSuscripcion);


export default router;
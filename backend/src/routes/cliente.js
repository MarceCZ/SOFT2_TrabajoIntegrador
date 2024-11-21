import express from 'express';
import controller from '../controllers/cliente.js';

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.put('/:id', controller.update);


export default router;
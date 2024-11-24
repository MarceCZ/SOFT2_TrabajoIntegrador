const express = require('express');
const controller = require('../controllers/kit_producto');

const router = express.Router();

router.get('/', controller.findAll);
router.get('/complete/:id', controller.findOneCompleteCliente);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.put('/', controller.update);

module.exports = router;

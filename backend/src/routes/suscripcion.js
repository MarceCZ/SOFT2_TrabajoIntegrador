const express = require('express');
const controller = require('../controllers/suscripcion');

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.delete('/', controller.removeAllSubscriptions);
router.put('/', controller.update);

router.post('/create', controller.create);
router.post('/cancel/:id', controller.cancelSuscripcion);

module.exports = router;

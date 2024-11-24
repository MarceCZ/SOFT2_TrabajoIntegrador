const express = require('express');
const controller = require('../controllers/cliente');

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.put('/:id', controller.update);

module.exports = router;

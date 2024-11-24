const express = require('express');
const controller = require('../controllers/receta');

const router = express.Router();

router.get('/', controller.findAll);
router.get('/complete', controller.findAllComplete);
router.get('/complete/:id', controller.findAllCompleteXBotica);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.put('/', controller.update);

module.exports = router;

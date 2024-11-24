const express = require('express');
const controller = require('../controllers/botica');

const router = express.Router();

router.get('/', controller.findAll);
router.get('/findallcomplete', controller.findAllComplete);
router.get('/findonecomplete/:id', controller.findOneComplete);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.put('/', controller.update);

module.exports = router;

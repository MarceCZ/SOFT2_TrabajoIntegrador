const express = require('express');
const controller = require('../controllers/email');

const router = express.Router();

router.post('/reset-request', controller.resetPassword);
router.post('/verificar-code', controller.verificarCodeCambiarPassword);
router.post('/enviar-consulta', controller.enviarConsulta);

module.exports = router;

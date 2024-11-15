import express from 'express';
import controller from '../controllers/email.js';

const router = express.Router();

router.post('/reset-request', controller.resetPassword);
router.post('/verificar-code', controller.verificarCodeCambiarPassword);

export default router;
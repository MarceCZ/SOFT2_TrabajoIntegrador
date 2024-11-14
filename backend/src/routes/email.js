import express from 'express';
import controller from '../controllers/email.js';

const router = express.Router();

router.post('/', controller.resetPassword);


export default router;
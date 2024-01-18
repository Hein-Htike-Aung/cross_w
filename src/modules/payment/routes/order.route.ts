import express from 'express';
import PaymentController from '../controllers/payment.controller';

const router = express.Router();

router.post('/v1/orders', PaymentController.createOrder);

export default router;

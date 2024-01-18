import express from 'express';
import PaymentController from '../controllers/payment.controller';
import jwt_auth from '../../../middlewares/jwt_auth';
import validateRequest from '../../../middlewares/validateRequest';
import {
  brainTreeCheckoutSchema,
  createOrderSchema,
  paypalCheckoutSchema,
} from '../schema/payment.schema';

const router = express.Router();

router.post(
  '/v1/paypal/checkout',
  //   [jwt_auth],
  [validateRequest(paypalCheckoutSchema)],
  PaymentController.proceedPalpalCheckout,
);

router.get(
  '/v1/braintree/client_token',
  //   [jwt_auth],
  PaymentController.clientToken,
);

router.post(
  '/v1/braintree/checkout',
  //   [jwt_auth],
  [validateRequest(brainTreeCheckoutSchema)],
  PaymentController.proceedBraintreeCheckout,
);

router.post(
  '/v1/orders',
  // [jwt_auth],
  [validateRequest(createOrderSchema)],
  PaymentController.createOrder,
);

export default router;

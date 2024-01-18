import braintree from 'braintree';
import { Request, Response } from 'express';
import paypal from 'paypal-rest-sdk';
import { AppMessage } from '../../../constants/app_message';
import handleError from '../../../utils/handleError';
import successResponse from '../../../utils/successResponse';
import CustomerOrder from '../../../models/order.model';

paypal.configure({
  mode: process.env.PAYPAL_MODE || '', // or 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID || '',
  client_secret: process.env.PAYPAL_CLIENT_SECRET || '',
});

const brainTreeGateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID || '',
  publicKey: process.env.BRAINTREE_PUBLIC_KEY || '',
  privateKey: process.env.BRAINTREE_PRIVATE_KEY || '',
});

export default class PaymentController {
  static proceedPalpalCheckout = async (req: Request, res: Response) => {
    try {
      const { return_url, cancel_url, total, currency, items, description } =
        req.body;

      const paymentData = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url,
          cancel_url,
        },
        transactions: [
          {
            item_list: {
              items,
            },
            amount: {
              total,
              currency,
            },
            description,
          },
        ],
      };

      paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
          throw error;
        } else {
          // Redirect the user to the PayPal approval URL
          if (payment.links) {
            const approvalUrl = payment.links.find(
              (link) => link?.rel === 'approval_url',
            )?.href;
            console.log('Redirect to:', approvalUrl);
            return successResponse(req, res, AppMessage.checkout, {
              approvalUrl,
            });
          }
        }
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static clientToken = async (req: Request, res: Response) => {
    const braintree_client_token = await brainTreeGateway.clientToken.generate(
      {},
    );
    return successResponse(req, res, null, { braintree_client_token });
  };

  static proceedBraintreeCheckout = async (req: Request, res: Response) => {
    try {
      const { amount, paymentMethodNonce } = req.body;

      const saleData = await brainTreeGateway.transaction.sale({
        paymentMethodNonce,
        amount,
        options: {
          submitForSettlement: true,
        },
      });

      return successResponse(req, res, AppMessage.checkout, { saleData });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static createOrder = async (req: Request, res: Response) => {
    try {
      const { items, total, customer, paid_by } = req.body;

      await CustomerOrder.create({
        items,
        total,
        customer,
        paid_by,
      });

      return successResponse(req, res, AppMessage.created);
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

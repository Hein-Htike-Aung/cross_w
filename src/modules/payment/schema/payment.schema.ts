import * as yup from 'yup';

export const paypalCheckoutSchema = yup.object().shape({
  return_url: yup.string().url().required(),
  cancel_url: yup.string().url().required(),
  total: yup.string().required(),
  currency: yup.string().length(3).uppercase().required(),
  items: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      quantity: yup.number().positive().integer().required(),
      price: yup.number().positive().required(),
    }),
  ),
  description: yup.string().required(),
});

export const brainTreeCheckoutSchema = yup.object().shape({
  amount: yup.string().required(),
  paymentMethodNonce: yup.string().required(),
});

export const createOrderSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      quantity: yup.number().positive().integer().required(),
      price: yup.number().positive().required(),
    }),
  ),
  total: yup.string().required(),
  customer: yup.string().required(),
  paid_by: yup.string().required(),
});

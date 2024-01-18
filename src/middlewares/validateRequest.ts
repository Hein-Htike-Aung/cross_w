import { AnySchema, ValidationError } from 'yup';
import { Request, Response, NextFunction } from 'express';
import errorResponse from '../utils/errorResponse';
import { AppMessage } from '../constants/app_message';

const validateRequest =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ValidationError)
        return errorResponse(
          req,
          res,
          400,
          AppMessage.badRequest,
          error.errors,
        );
      else console.error(error);
    }
  };

export default validateRequest;

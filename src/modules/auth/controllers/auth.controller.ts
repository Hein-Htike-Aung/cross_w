import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import successResponse from '../../../utils/successResponse';

export default class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      return successResponse(req, res, null);
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

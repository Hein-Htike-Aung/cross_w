import { Request, Response } from 'express';
import { AppMessageUrlNotFound } from '../constants/app_message';
import errorResponse from '../utils/errorResponse';

const notFound = (req: Request, res: Response) =>
  errorResponse(req, res, 404, AppMessageUrlNotFound);

export default notFound;

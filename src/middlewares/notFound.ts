import { Request, Response } from 'express';
import errorResponse from '../utils/errorResponse';

const notFound = (req: Request, res: Response) =>
  errorResponse(res, 404, `not found - ${req.originalUrl}`);

export default notFound;

import { Request, Response } from 'express';
import { languages } from '../constants/app_message';

const errorHandler = (err: any, req: Request, res: Response) => {
  const language = req.headers['language'] as languages;

  return res.status(err.statusCode).json({
    status: false,
    statusCode: err.statusCode,
    message: err?.messages[language ?? 'en'],
    stack: err?.stack,
    errors: err,
  });
};

export default errorHandler;

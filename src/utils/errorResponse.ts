import { Request, Response } from 'express';
import { AppMessage, languages } from '../constants/app_message';

const errorResponse = (
  req: Request,
  res: Response,
  statusCode = 500,
  message: any,
  errors = {},
) => {
  const language = req.headers['language'] as languages;

  res.status(statusCode).json({
    status: false,
    statusCode,
    message: message ?? AppMessage.somethingWentWrong[language ?? 'en'],
    errors,
  });
};

export default errorResponse;

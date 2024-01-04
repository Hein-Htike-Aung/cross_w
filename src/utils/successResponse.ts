import { Request, Response } from 'express';
import { AppMessage, languages } from '../constants/app_message';

const successResponse = (
  req: Request,
  res: Response,
  message: never | null | undefined,
  data = {},
) => {
  const language = req.headers['language'] as languages;

  res.status(200).json({
    status: true,
    statusCode: 200,
    message: message ?? AppMessage.retrievedSuccessful[language ?? 'en'],
    data,
  });
};

export default successResponse;

import { Request, Response } from 'express';
import { AppMessage, languages } from '../constants/app_message';

const successResponse = (
  req: Request,
  res: Response,
  message: any,
  data = {},
) => {
  const language = req.headers['language'] as languages;

  res.status(200).json({
    status: true,
    statusCode: 200,
    message: message
      ? message[language ?? 'en']
      : AppMessage.retrievedSuccessful[language ?? 'en'],
    data,
  });
};

export default successResponse;

import { Request, Response } from 'express';
import AppError from './appError';
import { AppMessage, languages } from '../constants/app_message';

const handleError = (req: Request, res: Response, error: any) => {
  console.error({ error });
  const language = req.headers['language'] as languages;

  if (error instanceof AppError) {
    res.status(500).json({
      status: false,
      statusCode: error.statusCode,
      message: error.message,
    });
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: AppMessage.cannotBeDeleted[language ?? 'en'],
    });
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: AppMessage.alreadyExists[language ?? 'en'],
    });
  } else {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: AppMessage.somethingWentWrong[language ?? 'en'],
      errors: error,
    });
  }
};

export default handleError;

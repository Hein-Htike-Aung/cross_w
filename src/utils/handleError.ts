import { Response } from 'express';
import AppError from './appError';

const handleError = (res: Response, error: any) => {
  console.error({ error });
  if (error instanceof AppError) {
    res.status(500).json({
      status: false,
      statusCode: error.statusCode,
      messages: error.message,
    });
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    res.status(400).json({
      status: false,
      statusCode: 400,
      messages: 'Can not be deleted',
    });
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      status: false,
      statusCode: 400,
      messages: 'Already exists',
    });
  } else {
    res.status(500).json({
      status: false,
      statusCode: 500,
      messages: 'Something went wrong',
      errors: error,
    });
  }
};

export default handleError;

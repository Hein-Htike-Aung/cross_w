import { Express, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import errorResponse from '../utils/errorResponse';
import { AppMessage } from '../constants/app_message';
import uploadFile from '../utils/uploadFile';
import successResponse from '../utils/successResponse';
import handleError from '../utils/handleError';

export const fileUploadRoutes = (app: Express) => {
  /* Admin file upload */
  app.post('/api/v1/file_upload', async (req: Request, res: Response) => {
    try {
      if (!req.files?.file)
        return errorResponse(req, res, 404, AppMessage.fileNotFound);

      uploadFile(req.files.file as UploadedFile, 'image/png', async (url) => {
        return successResponse(req, res, AppMessage.created, { url });
      });
    } catch (error) {
      handleError(req, res, error);
    }
  });
};

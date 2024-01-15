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

      // uploadFile(req.files.file as UploadedFile, 'image/png', async (url) => {
      //   return successResponse(req, res, AppMessage.created, { url });
      // });

      const url = await new Promise(async (resolve, reject) => {
        const url = await uploadFile(req?.files?.file as any, 'image/png');
        resolve(url);
      });

      return successResponse(req, res, AppMessage.created, { url });
    } catch (error) {
      handleError(req, res, error);
    }
  });

  app.post('/api/v1/multi_file_upload', async (req: Request, res: Response) => {
    try {
      const files: any = req.files?.files;

      if (!files || files.length === 0)
        return errorResponse(req, res, 404, AppMessage.fileNotFound);

      const files_arr: any = [];

      await Promise.all(
        files.map(async (file: any) => {
          const url = await new Promise(async (resolve, reject) => {
            const url = await uploadFile(file as UploadedFile, 'image/png');
            resolve(url);
          });
          console.log({ url });
          if (url) {
            files_arr.push(url);
          }
        }),
      );

      return successResponse(req, res, AppMessage.created, { urls: files_arr });
    } catch (error) {
      handleError(req, res, error);
    }
  });
};

import { Express, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import errorResponse from '../utils/errorResponse';
import { AppMessage } from '../constants/app_message';
import uploadFile from '../utils/uploadFile';
import successResponse from '../utils/successResponse';
import handleError from '../utils/handleError';
import Demo from '../models/demon.model';
import UserPlace from '../models/user_place.model';

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

  app.post('/tt', async (req: Request, res: Response) => {
    const data = await Demo.findAll();

    await Promise.all(
      data.map(async (d: any) => {
        const a = d.data;

        const type = {
          '0': 'Hostel',
          '1': 'Rent',
          '2': 'Sell',
        };

        await UserPlace.create({
          type: (type as any)[a.type],
          price: a.price[0],
          township_id: a.township,
          owner_type: a.owner_type,
          building_info: a.building_info,
          payment: a.payment,
          home_no: a.home_no,
          street: a.street,
          ward: a.ward, 

          latitude: a.lat,
          longitude: a.long,

          description: a.description,
          images: a.images,
          address: a.address,
          contact: a.contact,
          image_url: a.image_url,
          town_name: a.town_name,
          location_type: a.location_type,
          floor_attribute: a.floor_attribute,
          apartment_attribute: a.apartment_attribute,
        });
      }),
    );

    res.json('tt');
  });
};

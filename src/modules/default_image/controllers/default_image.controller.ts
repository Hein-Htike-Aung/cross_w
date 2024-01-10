import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import DefaultImage from '../../../models/default_image.model';
import successResponse from '../../../utils/successResponse';
import { AppMessage } from '../../../constants/app_message';

export default class DefaultImageController {
  static createDefaultImage = async (req: Request, res: Response) => {
    try {
      await DefaultImage.create({
        ...req.body,
      });

      return successResponse(req, res, AppMessage.created);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static updateDefaultImage = async (req: Request, res: Response) => {
    try {
      const { default_image_id } = req.params;

      await DefaultImage.update(
        {
          ...req.body,
        },
        {
          where: {
            id: default_image_id,
          },
        },
      );

      return successResponse(req, res, AppMessage.updated);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  

}

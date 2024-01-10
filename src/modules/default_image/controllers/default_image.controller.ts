import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import DefaultImage from '../../../models/default_image.model';
import successResponse from '../../../utils/successResponse';
import { AppMessage } from '../../../constants/app_message';
import getPaginationData from '../../../utils/getPagination';

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

  static deleteDefaultImage = async (req: Request, res: Response) => {
    try {
      const { default_image_id } = req.params;

      await DefaultImage.destroy({
        where: {
          id: default_image_id,
        },
      });

      return successResponse(req, res, AppMessage.deleted);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static imageById = async (req: Request, res: Response) => {
    try {
      const { default_image_id } = req.params;

      const defaultImage = await DefaultImage.findByPk(default_image_id);

      return successResponse(req, res, null, { defaultImage });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static imageList = async (req: Request, res: Response) => {
    try {
      const { offset, limit } = getPaginationData(req.query);

      const { rows, count } = await DefaultImage.findAndCountAll({
        offset,
        limit,
      });

      return successResponse(req, res, null, {
        defaultImages: rows,
        total: count,
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

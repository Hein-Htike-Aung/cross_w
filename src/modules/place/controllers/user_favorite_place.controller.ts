import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import UserFavoritePlace from '../../../models/user_favorite_place.model';
import successResponse from '../../../utils/successResponse';
import { AppMesh } from 'aws-sdk';
import { AppMessage } from '../../../constants/app_message';

export default class UserFavoritePlaceController {
  static toggleFavorite = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      const { user_place_id } = req.params;

      const existingPlace = await UserFavoritePlace.findOne({
        where: {
          user_id: user.id,
          user_place_id: Number(user_place_id),
        },
      });

      if (existingPlace) {
        await UserFavoritePlace.destroy({
          where: {
            user_id: user.id,
            user_place_id: Number(user_place_id),
          },
        });

        return successResponse(req, res, AppMessage.removeToFavorite);
      } else {
        await UserFavoritePlace.create({
          user_id: user.id,
          user_place_id: Number(user_place_id),
        });

        return successResponse(req, res, AppMessage.addToFavorite);
      }
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import UserFavoritePlace from '../../../models/user_favorite_place.model';
import successResponse from '../../../utils/successResponse';
import { AppMesh } from 'aws-sdk';
import { AppMessage } from '../../../constants/app_message';
import UserService from '../../user/services/user.service';
import Place from '../../../models/place.model';
import UserPlace from '../../../models/user_place.model';
import NayarUser from '../../../models/nayar_user.model';
import { lastPage } from '../../../utils/lastPage';

export default class UserFavoritePlaceController {
  static toggleFavorite = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      await UserService.findUserById(user.id);

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

  static userFavoritePlace = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      const { rows, count } = await UserFavoritePlace.findAndCountAll({
        order: [['id', 'desc']],
        where: {
          user_id: user.id,
        },
        include: [
          {
            model: UserPlace,
            as: 'user_place',
            include: [
              {
                model: NayarUser,
                as: 'nayar_user',
              },
            ],
          },
        ],
      });

      return successResponse(req, res, null, {
        favorite_places: rows,
        total: count,
        lastPage: lastPage(count),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

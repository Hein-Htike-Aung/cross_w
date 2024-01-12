import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import UserPlace from '../../../models/user_place.model';
import successResponse from '../../../utils/successResponse';
import {
  AppMessage,
  AppMessageModelNotFound,
} from '../../../constants/app_message';
import UserFavoritePlace from '../../../models/user_favorite_place.model';
import NayarUser from '../../../models/nayar_user.model';
import Demo from '../../../models/demon.model';
import errorResponse from '../../../utils/errorResponse';
import UserService from '../../user/services/user.service';
import getPaginationData from '../../../utils/getPagination';
import { lastPage } from '../../../utils/lastPage';
import Township from '../../../models/township.model';

export default class PlaceController {
  static addPlace = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      await UserService.findUserById(user.id);

      // const {
      //   price,
      //   owner_type,
      //   contact,
      //   building_info,
      //   description,
      //   home_no,
      //   street,
      //   township,
      //   ward,
      //   type,
      //   lat,
      //   long,
      //   bedroom,
      //   aircon,
      //   bath_toilet,
      //   near_bus_stop,
      //   near_market,
      //   near_hospital,
      //   sqft,
      //   contract_term,
      //   payment_term,
      //   agent_fee,
      //   contact_channel,
      //   payment,
      // } = req.body;

      await UserPlace.create({
        user_id: user.id,
        ...req.body,
      });

      return successResponse(req, res, AppMessage.created);
    } catch (error) {
      console.error({ error });
      handleError(req, res, error);
    }
  };

  static userPlaces = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      const { offset, limit } = getPaginationData(req.query);

      await UserService.findUserById(user.id);

      const { rows, count } = await UserPlace.findAndCountAll({
        limit,
        offset,
        order: [['id', 'desc']],
        include: [
          {
            model: NayarUser,
            as: 'nayar_user',
          },
          {
            model: Township,
            as: 'township',
          },
        ],
        where: {
          user_id: user.id,
        },
      });

      await Promise.all(
        rows.map(async (up: any) => {
          const userFavoritePlace = await UserFavoritePlace.findOne({
            where: {
              user_id: user.id,
              user_place_id: up.id,
            },
          });

          up.dataValues['is_favorite'] = !!userFavoritePlace;
        }),
      );

      return successResponse(req, res, null, {
        user_places: rows,
        total: count,
        lastPage: lastPage(count),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static userPlaceById = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      await UserService.findUserById(user.id);

      const { user_place_id } = req.params;

      const user_place: any = await UserPlace.findOne({
        order: [['id', 'desc']],
        include: [
          {
            model: NayarUser,
            as: 'nayar_user',
          },
        ],
        where: {
          id: user_place_id,
        },
      });

      if (!user_place)
        return errorResponse(
          req,
          res,
          404,
          AppMessageModelNotFound('User place'),
        );

      const userFavoritePlace = await UserFavoritePlace.findOne({
        where: {
          user_id: user.id,
          user_place_id: user_place.id,
        },
      });

      user_place.dataValues['is_favorite'] = !!userFavoritePlace;

      return successResponse(req, res, null, { user_place });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static deletePlace = async (req: Request, res: Response) => {
    try {
      const { user_place_id } = req.params;

      await UserPlace.destroy({
        where: {
          id: user_place_id,
        },
      });

      return successResponse(req, res, AppMessage.deleted);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static placeData = async (req: Request, res: Response) => {
    try {
      await Demo.create({
        data: req.body,
      });

      return successResponse(req, res, AppMessage.created);
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

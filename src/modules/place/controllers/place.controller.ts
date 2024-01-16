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
import likeSearch from '../../../utils/likeSearch';
import { Op } from 'sequelize';
import { sequelize } from '../../../models';

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
      const data = req.body;

      await Demo.create({
        data: req.body,
      });

      // const type = {
      //   '0': 'Hostel',
      //   '1': 'Rent',
      //   '2': 'Sell',
      // };

      // await UserPlace.create({
      //   type: (type as any)[data.type],
      //   price: data.price[0],
      //   township_id: data.township,
      //   owner_type: data.owner_type,
      //   building_info: data.building_info,
      //   payment: data.payment,
      //   home_no: data.home_no,
      //   street: data.street,
      //   ward: data.ward,

      //   latitude: data.lat,
      //   longitude: data.long,

      //   description: data.description,
      //   images: data.images,
      //   address: data.address,
      //   contact: data.contact,
      //   image_url: data.image_url,
      //   town_name: data.town_name,
      //   location_type: data.location_type,
      //   floor_attribute: data.floor_attribute,
      //   apartment_attribute: data.apartment_attribute,
      // });

      return successResponse(req, res, AppMessage.created);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static allPlaceList = async (req: Request, res: Response) => {
    try {
      const {
        township,
        near_bus_stop,
        near_hospital,
        near_market,
        min_price,
        max_price,
        type,
        owner_name,
        owner_type,
      } = req.query;

      const { offset, limit } = getPaginationData(req.query);

      const max = await UserPlace.findOne({
        attributes: ['price'],
        order: [['price', 'desc']],
      });

      const min = await UserPlace.findOne({
        attributes: ['price'],
        order: [['price', 'asc']],
      });

      const { rows, count } = await UserPlace.findAndCountAll({
        limit,
        offset,
        where: {
          near_bus_stop: {
            [Op.like]: likeSearch(near_bus_stop),
          },
          near_hospital: {
            [Op.like]: likeSearch(near_hospital),
          },
          near_market: {
            [Op.like]: likeSearch(near_market),
          },
          type: {
            [Op.like]: likeSearch(type),
          },
          owner_type: {
            [Op.like]: likeSearch(owner_type),
          },
          price: {
            [Op.between]: [
              Number(min_price || min?.price),
              Number(max_price || max?.price),
            ],
          },
        },
        order: [['id', 'desc']],
        include: [
          {
            model: NayarUser,
            as: 'nayar_user',
            required: false,
            where: {
              name: {
                [Op.like]: likeSearch(owner_name),
              },
            },
          },
          {
            model: Township,
            as: 'township',
            required: false,
            where: {
              name: {
                [Op.like]: likeSearch(township),
              },
            },
          },
        ],
      });

      return successResponse(req, res, null, {
        user_places: rows,
        total: count,
        lastPage: lastPage(count),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static PlaceListByMiles = async (req: Request, res: Response) => {
    try {
      const { lat, long, mile } = req.query;

      const targetLatitude = lat;
      const targetLongitude = long;
      const distanceInMiles = mile; // Set your desired distance in miles

      const user_places_ids = await UserPlace.findAll({
        attributes: [
          'id',
          [
            sequelize.literal(
              `(6371 * acos(cos(radians(${targetLatitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${targetLongitude})) + sin(radians(${targetLatitude})) * sin(radians(latitude)))) * 0.621371`,
            ),
            'distance_in_miles',
          ],
        ],
        where: sequelize.where(
          sequelize.literal(
            `(6371 * acos(cos(radians(${targetLatitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${targetLongitude})) + sin(radians(${targetLatitude})) * sin(radians(latitude)))) * 0.621371`,
          ),
          '<=',
          distanceInMiles,
        ),
      });

      const ids: any = [];
      user_places_ids.forEach((place) => ids.push(place.id));

      const {
        township,
        near_bus_stop,
        near_hospital,
        near_market,
        min_price,
        max_price,
        type,
        owner_name,
        owner_type,
      } = req.query;

      const { offset, limit } = getPaginationData(req.query);

      const max = await UserPlace.findOne({
        attributes: ['price'],
        order: [['price', 'desc']],
      });

      const min = await UserPlace.findOne({
        attributes: ['price'],
        order: [['price', 'asc']],
      });

      const user_places = await UserPlace.findAll({
        where: {
          id: ids,
          near_bus_stop: {
            [Op.like]: likeSearch(near_bus_stop),
          },
          near_hospital: {
            [Op.like]: likeSearch(near_hospital),
          },
          near_market: {
            [Op.like]: likeSearch(near_market),
          },
          type: {
            [Op.like]: likeSearch(type),
          },
          owner_type: {
            [Op.like]: likeSearch(owner_type),
          },
          price: {
            [Op.between]: [
              Number(min_price || min?.price),
              Number(max_price || max?.price),
            ],
          },
        },
        order: [['id', 'desc']],
        include: [
          {
            model: NayarUser,
            as: 'nayar_user',
            required: false,
            where: {
              name: {
                [Op.like]: likeSearch(owner_name),
              },
            },
          },
          {
            model: Township,
            as: 'township',
            required: false,
            where: {
              name: {
                [Op.like]: likeSearch(township),
              },
            },
          },
        ],
      });

      return successResponse(req, res, null, {
        user_places,
        user_places_length: user_places.length,
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static placesByTownship = async (req: Request, res: Response) => {
    try {
      const townships = await Township.findAll({
        attributes: [
          'id',
          'name',
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM "user_place" WHERE "user_place"."township_id" = "Township"."id")',
            ),
            'user_place_count',
          ],
        ],
        include: [
          {
            model: UserPlace,
            as: 'user_places',
          },
        ],
      });

      return successResponse(req, res, null, { townships });
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

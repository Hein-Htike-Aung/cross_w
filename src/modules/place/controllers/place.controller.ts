import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import UserPlace from '../../../models/user_place.model';
import successResponse from '../../../utils/successResponse';
import { AppMessage } from '../../../constants/app_message';

export default class PlaceController {
  static addPlace = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
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

      const user_places = await UserPlace.findAll({
        order: [['id', 'desc']],
        where: {
          user_id: user.id,
        },
      });

      return successResponse(req, res, null, { user_places });
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
}

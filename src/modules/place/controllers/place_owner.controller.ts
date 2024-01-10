import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import UserPlace from '../../../models/user_place.model';
import Notification from '../../../models/notification.model';
import { CATEGORY } from '../../../types';
import successResponse from '../../../utils/successResponse';
import { AppMessage } from '../../../constants/app_message';
import NayarUser from '../../../models/nayar_user.model';

export default class PlaceOwnerController {
  static contactToOwner = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      const { place_id } = req.params;

      const user_place = await UserPlace.findByPk(place_id);

      if (user_place?.user_id != user.id) {
        await Notification.create({
          from_user_id: user.id,
          to_user_id: Number(user_place?.user_id),
          place_id: Number(place_id),
          title: {
            en: 'Interest',
            my: '',
            th: '',
            ja: '',
            ko: '',
          },
          body: {
            en: `${user.name} interests your estate`,
            my: '',
            th: '',
            ja: '',
            ko: '',
          },
          category: CATEGORY.CONTACT,
        });

        // send notification
      }

      return successResponse(req, res, AppMessage.created);
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

import { Request, Response } from 'express';
import { omit } from 'lodash';
// import queryString from 'query-string';
import { Op, Sequelize } from 'sequelize';
import { AppMessage } from '../../../constants/app_message';
import Notification from '../../../models/notification.model';
import Place from '../../../models/place.model';
import Township from '../../../models/township.model';
import NayarUser from '../../../models/nayar_user.model';
import { LOGIN_PROVIDER } from '../../../types';
import errorResponse from '../../../utils/errorResponse';
import handleError from '../../../utils/handleError';
import isDuplicatedRecord from '../../../utils/isDuplicateRecord';
import likeSearch from '../../../utils/likeSearch';
import successResponse from '../../../utils/successResponse';
import AuthService from '../../auth/services/auth.service';
import getPaginationData from '../../../utils/getPagination';

export default class UserController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { phone, password } = req.body;

      const existingUser = await NayarUser.findOne({
        where: {
          phone,
        },
      });

      if (existingUser)
        return errorResponse(req, res, 403, AppMessage.alreadyExists);

      const hashedPassword = await AuthService.encryptPassword(password);

      const user = await NayarUser.create({
        ...req.body,
        password: hashedPassword,
        provider: LOGIN_PROVIDER.PHONE,
      });

      const { access_token, refresh_token } =
        AuthService.generateAuthToken<NayarUser>(user.dataValues, 'user');

      return successResponse(req, res, null, {
        access_token,
        refresh_token,
        ...omit(user.dataValues, 'password'),
      });
    } catch (error) {
      console.error({ error });
      handleError(req, res, error);
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    try {
      const { phone } = req.body;

      const { user_id } = req.params;

      const existingUser = await NayarUser.findOne({
        where: {
          phone,
        },
      });

      if (isDuplicatedRecord(existingUser, user_id)) {
        return errorResponse(req, res, 403, AppMessage.alreadyExists);
      }

      await NayarUser.update(
        {
          ...req.body,
        },
        {
          where: {
            id: user_id,
          },
        },
      );

      return successResponse(req, res, AppMessage.updated);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static updateDeviceToken = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;

      const { device_token } = req.body;

      await NayarUser.update(
        {
          device_token,
        },
        {
          where: {
            id: user_id,
          },
        },
      );

      return successResponse(req, res, AppMessage.updated);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;

      await Place.destroy({
        where: {
          user_id: user_id,
        },
      });

      await Notification.destroy({
        where: {
          [Op.or]: {
            from_user_id: user_id,
            to_user_id: user_id,
          },
        },
      });

      await NayarUser.destroy({
        where: {
          id: user_id,
        },
      });

      return successResponse(req, res, AppMessage.deleted);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static userById = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;

      const user = await NayarUser.findByPk(user_id, {
        include: [
          {
            model: Township,
            as: 'township',
          },
        ],
      });

      return successResponse(req, res, null, {
        ...omit(user?.dataValues, 'password'),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static userList = async (req: Request, res: Response) => {
    try {
      const { search } = req.query;

      const { offset, limit } = getPaginationData(req.query);

      const { rows, count } = await NayarUser.findAndCountAll({
        offset,
        limit,
        where: {
          [Op.or]: [
            Sequelize.literal(`type::text ILIKE '%${search}%'`),
            { name: { [Op.iLike]: likeSearch(search as string) } },
            { phone: { [Op.iLike]: likeSearch(search as string) } },
            { email: { [Op.iLike]: likeSearch(search as string) } },
            { address: { [Op.iLike]: likeSearch(search as string) } },
          ],
        },
        order: [['id', 'desc']],
        include: [
          {
            model: Township,
            as: 'township',
          },
        ],
      });

      return successResponse(req, res, null, { users: rows, total: count });
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

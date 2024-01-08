import { omit } from 'lodash';
import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import User from '../../../models/user.model';
import errorResponse from '../../../utils/errorResponse';
import { AppMessage } from '../../../constants/app_message';
import AuthService from '../../auth/services/auth.service';
import successResponse from '../../../utils/successResponse';
import { Op, Sequelize } from 'sequelize';
import { sequelize } from '../../../models';
import { LOGIN_PROVIDER } from '../../../types';
import isDuplicatedRecord from '../../../utils/isDuplicateRecord';
import Place from '../../../models/place.model';
import Notification from '../../../models/notification.model';

export default class UserController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { phone, password } = req.body;

      const existingUser = await User.findOne({
        where: {
          phone,
        },
      });

      if (existingUser)
        return errorResponse(req, res, 403, AppMessage.alreadyExists);

      const hashedPassword = await AuthService.encryptPassword(password);

      const user = await User.create({
        ...req.body,
        password: hashedPassword,
        provider: LOGIN_PROVIDER.PHONE,
      });

      const { access_token, refresh_token } =
        AuthService.generateAuthToken<User>(user.dataValues, 'user');

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

      const existingUser = await User.findOne({
        where: {
          phone,
        },
      });

      if (isDuplicatedRecord(existingUser, user_id)) {
        return errorResponse(req, res, 403, AppMessage.alreadyExists);
      }

      await User.update(
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

      console.log({ user_id, device_token });

      await User.update(
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

      await User.destroy({
        where: {
          id: user_id,
        },
      });

      return successResponse(req, res, AppMessage.deleted);
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

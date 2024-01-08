import { omit } from 'lodash';
import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import User from '../../../models/user.model';
import errorResponse from '../../../utils/errorResponse';
import { AppMessage } from '../../../constants/app_message';
import AuthService from '../../auth/services/auth.service';
import successResponse from '../../../utils/successResponse';
import { Sequelize } from 'sequelize';
import { sequelize } from '../../../models';
import { LOGIN_PROVIDER } from '../../../types';
import isDuplicatedRecord from '../../../utils/isDuplicateRecord';

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
        AuthService.generateAuthToken<User>(existingUser, 'user');

      return successResponse(req, res, null, {
        access_token,
        refresh_token,
        ...omit(user.dataValues, 'password'),
      });
    } catch (error) {
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

      // const targetLatitude = 37.7749; // Example latitude
      // const targetLongitude = -122.4194; // Example longitude
      // const distanceInMiles = 1;

      // const usersWithinDistance = await User.findAll({
      //   attributes: [
      //     'id',
      //     'username',
      //     [
      //       sequelize.literal(
      //         `6371 * acos(cos(radians(${targetLatitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${targetLongitude})) + sin(radians(${targetLatitude})) * sin(radians(latitude)))`,
      //       ),
      //       'distance',
      //     ],
      //   ],
      //   where: sequelize.where(
      //     sequelize.literal(
      //       `6371 * acos(cos(radians(${targetLatitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${targetLongitude})) + sin(radians(${targetLatitude})) * sin(radians(latitude)))`,
      //     ),
      //     '<=',
      //     distanceInMiles,
      //   ),
      //   order: sequelize.literal('distance'), // Optional: Order by distance
      // });

      return successResponse(req, res, AppMessage.updated);
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

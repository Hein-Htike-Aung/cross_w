import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import successResponse from '../../../utils/successResponse';
import User from '../../../models/user.model';
import errorResponse from '../../../utils/errorResponse';
import {
  AppMessage,
  AppMessageModelNotFound,
} from '../../../constants/app_message';
import AuthService from '../services/auth.service';
import { get, omit } from 'lodash';

export default class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      const { phone, password, device_token } = req.body;

      const user = await User.findOne({
        where: {
          phone,
        },
      });

      if (!user)
        return errorResponse(req, res, 403, AppMessage.invalidCredential);

      const validatedUser = await AuthService.validateUser<User>(
        user,
        password,
      );

      if (!validatedUser) {
        return errorResponse(req, res, 403, AppMessage.invalidCredential);
      }

      const { access_token, refresh_token } =
        AuthService.generateAuthToken<User>(user, 'user');

      return successResponse(req, res, null, {
        access_token,
        refresh_token,
        ...omit(user.dataValues, 'password'),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static generateToken = (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      const { access_token, refresh_token } =
        AuthService.generateAuthToken<User>(user, 'user');

      return successResponse(req, res, null, { access_token, refresh_token });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static changePassword = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;

      const { current_password, new_password } = req.body;

      const user = await User.findByPk(user_id);

      if (!user)
        return errorResponse(req, res, 404, AppMessageModelNotFound('User'));

      const validatedUser = await AuthService.validateUser<User>(
        user,
        current_password,
      );

      if (!validatedUser)
        return errorResponse(req, res, 400, AppMessage.invalidCredential);

      const hashedPassword = await AuthService.encryptPassword(new_password);

      await User.update(
        {
          password: hashedPassword,
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
}

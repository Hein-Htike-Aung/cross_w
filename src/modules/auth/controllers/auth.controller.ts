import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import successResponse from '../../../utils/successResponse';
import NayarUser from '../../../models/nayar_user.model';
import errorResponse from '../../../utils/errorResponse';
import {
  AppMessage,
  AppMessageModelNotFound,
} from '../../../constants/app_message';
import AuthService from '../services/auth.service';
import { get, omit } from 'lodash';
import UserService from '../../user/services/user.service';
import { USER_TYPE } from '../../../types';

export default class AuthController {
  static adminLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await NayarUser.findOne({
        where: {
          email,
          type: USER_TYPE.ADMIN,
        },
      });

      if (!user)
        return errorResponse(req, res, 403, AppMessage.invalidCredential);

      const validatedUser = await AuthService.validateUser<NayarUser>(
        user,
        password,
      );

      if (!validatedUser) {
        return errorResponse(req, res, 403, AppMessage.invalidCredential);
      }

      const { access_token, refresh_token } =
        AuthService.generateAuthToken<NayarUser>(user.dataValues, 'user');

      return successResponse(req, res, null, {
        access_token,
        refresh_token,
        ...omit(user.dataValues, 'password'),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { phone, password } = req.body;

      const user = await NayarUser.findOne({
        where: {
          phone,
        },
      });

      if (!user)
        return errorResponse(req, res, 403, AppMessage.invalidCredential);

      const validatedUser = await AuthService.validateUser<NayarUser>(
        user,
        password,
      );

      if (!validatedUser) {
        return errorResponse(req, res, 403, AppMessage.invalidCredential);
      }

      const { access_token, refresh_token } =
        AuthService.generateAuthToken<NayarUser>(user.dataValues, 'user');

      return successResponse(req, res, null, {
        access_token,
        refresh_token,
        ...omit(user.dataValues, 'password'),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static loginWithProvider = async (req: Request, res: Response) => {
    try {
      const { id, provider } = req.body;

      const existingUser = await NayarUser.findOne({
        where: {
          provider,
          provider_id: id,
        },
      });

      if (existingUser) {
        const { access_token, refresh_token } =
          AuthService.generateAuthToken<NayarUser>(
            existingUser.dataValues,
            'user',
          );

        return successResponse(req, res, null, {
          access_token,
          refresh_token,
          ...omit(existingUser.dataValues, 'password'),
        });
      }

      const hashedPassword = await AuthService.encryptPassword(id);

      let payload = {
        ...req.body,
        provider_id: id,
        password: hashedPassword,
      };

      payload = omit(payload, 'id');

      const newUser = await NayarUser.create(payload);

      const { access_token, refresh_token } =
        AuthService.generateAuthToken<NayarUser>(newUser.dataValues, 'user');

      return successResponse(req, res, null, {
        access_token,
        refresh_token,
        ...omit(newUser.dataValues, 'password'),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static generateToken = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      await UserService.findUserById(user.id);

      const existingUser = await NayarUser.findByPk(user.id);
      if (!existingUser)
        return errorResponse(req, res, 403, AppMessage.unauthorized);

      const { access_token, refresh_token } =
        AuthService.generateAuthToken<NayarUser>(
          existingUser.dataValues,
          'user',
        );

      return successResponse(req, res, null, { access_token, refresh_token });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static changePassword = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;

      const { current_password, new_password } = req.body;

      const user = await NayarUser.findByPk(user_id);

      if (!user)
        return errorResponse(req, res, 404, AppMessageModelNotFound('User'));

      const validatedUser = await AuthService.validateUser<NayarUser>(
        user,
        current_password,
      );

      if (!validatedUser)
        return errorResponse(req, res, 400, AppMessage.invalidCredential);

      const hashedPassword = await AuthService.encryptPassword(new_password);

      await NayarUser.update(
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

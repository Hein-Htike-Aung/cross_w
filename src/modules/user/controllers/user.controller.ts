import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import User from '../../../models/user.model';
import errorResponse from '../../../utils/errorResponse';
import { AppMessage } from '../../../constants/app_message';
import AuthService from '../../auth/services/auth.service';
import successResponse from '../../../utils/successResponse';

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

      await User.create({
        ...req.body,
        password: hashedPassword,
      });

      return successResponse(req, res, AppMessage.created);
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
}

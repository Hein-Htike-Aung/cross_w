import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import Notification from '../../../models/notification.model';
import UserService from '../../user/services/user.service';
import successResponse from '../../../utils/successResponse';
import getPaginationData from '../../../utils/getPagination';
import { AppMessage } from '../../../constants/app_message';
import { lastPage } from '../../../utils/lastPage';

export default class NotificationController {
  static allNotification = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      await UserService.findUserById(user.id);
      const { offset, limit } = getPaginationData(req.query);

      const { rows, count } = await Notification.findAndCountAll({
        limit,
        offset,
        order: [['id', 'desc']],
      });

      return successResponse(req, res, null, {
        notifications: rows,
        total: count,
        lastPage: lastPage(count),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static notificationByUser = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      await UserService.findUserById(user.id);
      const { offset, limit } = getPaginationData(req.query);

      const { rows, count } = await Notification.findAndCountAll({
        limit,
        offset,
        where: {
          to_user_id: user.id,
        },
        order: [['id', 'desc']],
      });

      return successResponse(req, res, null, {
        notifications: rows,
        total: count,
        lastPage: lastPage(count),
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static deleteNotification = async (req: Request, res: Response) => {
    try {
      const { notification_id } = req.params;

      await Notification.destroy({
        where: {
          id: notification_id,
        },
      });

      return successResponse(req, res, AppMessage.deleted);
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static readNotification = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      await Notification.update(
        {
          is_read: true,
        },
        {
          where: {
            to_user_id: user.id,
          },
        },
      );

      return successResponse(req, res, AppMessage.updated);
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

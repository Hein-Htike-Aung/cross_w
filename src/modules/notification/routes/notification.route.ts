import express from 'express';
import NotificationController from '../controllers/notification.controller';
import jwt_auth from '../../../middlewares/jwt_auth';

const router = express.Router();

router.get(
  '/v1/notiByUser',
  [jwt_auth],
  NotificationController.notificationByUser,
);

router.patch(
  '/v1/read_noti',
  [jwt_auth],
  NotificationController.readNotification,
);

router.delete(
  '/v1/delete_noti/:notification_id',
  [jwt_auth],
  NotificationController.deleteNotification,
);

export default router;

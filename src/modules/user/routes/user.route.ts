import express from 'express';
import UserController from '../controllers/user.controller';
import jwt_auth from '../../../middlewares/jwt_auth';

const router = express.Router();

router.post('/v1/register', UserController.createUser);

router.patch('/v1/users/:user_id', UserController.updateUser);

router.patch(
  '/v1/device_token/:user_id',
  [jwt_auth],
  UserController.updateDeviceToken,
);

export default router;

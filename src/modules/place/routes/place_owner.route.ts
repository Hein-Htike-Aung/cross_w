import express from 'express';
import jwt_auth from '../../../middlewares/jwt_auth';
import PlaceOwnerController from '../controllers/place_owner.controller';

const router = express.Router();

router.post(
  '/v1/send-notification/:place_id',
  [jwt_auth],
  PlaceOwnerController.contactToOwner,
);

export default router;

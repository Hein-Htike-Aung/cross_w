import express from 'express';
import UserFavoritePlaceController from '../controllers/user_favorite_place.controller';
import jwt_auth from '../../../middlewares/jwt_auth';

const router = express.Router();

router.patch(
  '/v1/toggle_user_favorite/:user_place_id',
  [jwt_auth],
  UserFavoritePlaceController.toggleFavorite,
);

export default router;

import express from 'express';
import PlaceController from '../controllers/place.controller';
import jwt_auth from '../../../middlewares/jwt_auth';

const router = express.Router();

router.post('/v1/user_place', [jwt_auth], PlaceController.addPlace);

router.get('/v1/placeByUser', [jwt_auth], PlaceController.userPlaces);

router.delete(
  '/v1/delete_place/:user_place_id',
  [jwt_auth],
  PlaceController.deletePlace,
);

export default router;

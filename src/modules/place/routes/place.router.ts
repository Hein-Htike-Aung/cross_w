import express from 'express';
import PlaceController from '../controllers/place.controller';
import jwt_auth from '../../../middlewares/jwt_auth';

const router = express.Router();

router.post('/v1/user_place', [jwt_auth], PlaceController.addPlace);

router.get('/v1/placeByUser', [jwt_auth], PlaceController.userPlaces);

router.get(
  '/v1/place/:user_place_id',
  [jwt_auth],
  PlaceController.userPlaceById,
);

router.delete(
  '/v1/delete_place/:user_place_id',
  [jwt_auth],
  PlaceController.deletePlace,
);

router.post('/v1/place_data', PlaceController.placeData);

router.get('/v1/all_places', PlaceController.allPlaceList);

router.get('/v1/places_by_miles', PlaceController.PlaceListByMiles);

router.get('/v1/places_by_townships', PlaceController.placesByTownship);

export default router;

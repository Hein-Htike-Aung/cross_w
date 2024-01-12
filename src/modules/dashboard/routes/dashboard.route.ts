import express from 'express';
import jwt_auth from '../../../middlewares/jwt_auth';
import DashboardController from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/v1/estate_data', [jwt_auth], DashboardController.estateData);

router.get(
  '/v1/weekly_estate_data',
  [jwt_auth],
  DashboardController.weeklyEstateData,
);

router.get(
  '/v1/popular_estate_data',
  [jwt_auth],
  DashboardController.popularEstateData,
);

export default router;

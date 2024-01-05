import express from 'express';
import TownshipController from '../controllers/township.controller';
import jwt_auth from '../../../middlewares/jwt_auth';

const router = express.Router();

router.get('/v1/townships', TownshipController.townshipList);

export default router;

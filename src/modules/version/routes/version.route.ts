import express from 'express';
import VersionController from '../controllers/version.controller';

const router = express.Router();

router.get('/v1/setup', VersionController.setUp);

export default router;

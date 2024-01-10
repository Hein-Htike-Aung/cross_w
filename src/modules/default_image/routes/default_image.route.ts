import express from 'express';
import DefaultImageController from '../controllers/default_image.controller';

const router = express.Router();

router.post('/v1/default_image', DefaultImageController.createDefaultImage);

router.patch(
  '/v1/default_image/:default_image_id',
  DefaultImageController.updateDefaultImage,
);

router.delete(
  '/v1/default_image/:default_image_id',
  DefaultImageController.deleteDefaultImage,
);

router.get(
  '/v1/default_image/:default_image_id',
  DefaultImageController.imageById,
);

router.get('/v1/default_image', DefaultImageController.imageList);

export default router;

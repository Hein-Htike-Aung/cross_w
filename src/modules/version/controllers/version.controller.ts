import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import successResponse from '../../../utils/successResponse';

export default class VersionController {
  static setUp = async (req: Request, res: Response) => {
    try {
      const version = {
        current_version_ios: '1.0.5',
        current_version_android: '1.0.5',
        force_update_message:
          'We have launched a new and improved version. Please update the app for better experience.',
        update_url: {
          android:
            'https://play.google.com/store/apps/details?id=com.nayyar.estateapp',
          ios: 'https://apps.apple.com/us/app/nayar/id6461724604',
          web: 'https://www.google.com',
          drive: 'https://www.google.com',
        },
        default_img: 'https://cms.nayarmm.com/dist/img/default_img.jpg',
        default_user_img:
          'https://cms.nayarmm.com/dist/img/default_user_img.jpg',
      };

      return successResponse(req, res, null, { version });
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

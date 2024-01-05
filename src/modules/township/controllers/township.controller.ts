import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import Township from '../../../models/township.model';
import successResponse from '../../../utils/successResponse';
import Region from '../../../models/region.model';
import Country from '../../../models/country.model';

export default class TownshipController {
  static townshipList = async (req: Request, res: Response) => {
    try {
      const townships = await Township.findAll({
        order: [['id', 'desc']],
        include: [
          {
            model: Region,
            as: 'region',
            include: [
              {
                model: Country,
                as: 'country',
              },
            ],
          },
        ],
      });

      return successResponse(req, res, null, { townships });
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

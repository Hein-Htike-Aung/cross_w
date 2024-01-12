import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import NayarUser from '../../../models/nayar_user.model';
import { Op } from 'sequelize';
import UserPlace from '../../../models/user_place.model';
import successResponse from '../../../utils/successResponse';
import { sequelize } from '../../../models';

export default class DashboardController {
  static estateData = async (req: Request, res: Response) => {
    try {
      const user_count = await NayarUser.count({
        where: {
          type: {
            [Op.notIn]: ['ADMIN', 'SUPER ADMIN'],
          },
        },
      });

      const totalEstate = await UserPlace.count();

      const rentEstate = await UserPlace.count({
        where: {
          type: 'Rent',
        },
      });

      const sellEstate = await UserPlace.count({
        where: {
          type: 'Sell',
        },
      });

      const hostelEstate = await UserPlace.count({
        where: {
          type: 'Hostel',
        },
      });

      return successResponse(req, res, null, {
        user_count,
        totalEstate,
        rentEstate,
        sellEstate,
        hostelEstate,
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static weeklyEstateData = async (req: Request, res: Response) => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const rentEstate = await UserPlace.count({
        where: {
          type: 'Rent',
          created_at: {
            [Op.gte]: oneWeekAgo,
          },
        },
      });

      const sellEstate = await UserPlace.count({
        where: {
          type: 'Sell',
          created_at: {
            [Op.gte]: oneWeekAgo,
          },
        },
      });

      const hostelEstate = await UserPlace.count({
        where: {
          type: 'Hostel',
          created_at: {
            [Op.gte]: oneWeekAgo,
          },
        },
      });

      return successResponse(req, res, null, {
        rentEstate,
        sellEstate,
        hostelEstate,
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };

  static popularEstateData = async (req: Request, res: Response) => {
    try {
      const popularEstatesByTownship = await UserPlace.findAll({
        attributes: [
          'township_id',
          [sequelize.fn('COUNT', sequelize.col('id')), 'estate_count'],
        ],
        group: ['township_id'],
        order: [[sequelize.literal('estate_count'), 'DESC']],
      });

      await Promise.all(
        popularEstatesByTownship.map(async (pe: any) => {
          const rentEstate = await UserPlace.count({
            where: {
              type: 'Rent',
              township_id: pe.township_id,
            },
          });

          const sellEstate = await UserPlace.count({
            where: {
              type: 'Sell',
              township_id: pe.township_id,
            },
          });

          const hostelEstate = await UserPlace.count({
            where: {
              type: 'Hostel',
              township_id: pe.township_id,
            },
          });

          pe.dataValues['rent'] = rentEstate;
          pe.dataValues['sell'] = sellEstate;
          pe.dataValues['hostel'] = hostelEstate;
        }),
      );

      return successResponse(req, res, null, {
        popularEstatesByTownship,
      });
    } catch (error) {
      handleError(req, res, error);
    }
  };
}

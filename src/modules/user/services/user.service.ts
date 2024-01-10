import { AppMessageModelNotFound } from '../../../constants/app_message';
import Township from '../../../models/township.model';
import NayarUser from '../../../models/user.model';
import AppError from '../../../utils/appError';

export default class UserService {
  static findUserById = async (id: number) => {
    const user = await NayarUser.findByPk(id, {
      include: [
        {
          model: Township,
          as: 'township',
        },
      ],
    });

    if (!user) throw new AppError(AppMessageModelNotFound('User'), 404);

    return user.dataValues;
  };
}

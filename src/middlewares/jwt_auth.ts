import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppMessage } from '../constants/app_message';
import NayarUser from '../models/user.model';
import errorResponse from '../utils/errorResponse';

const jwt_auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return errorResponse(req, res, 403, AppMessage.unauthorized);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      async (err: any, targetObj: any) => {
        if (err) return errorResponse(req, res, 400, err.message);

        if (targetObj.type === 'user') {
          if (targetObj.id) {
            const user = await NayarUser.findByPk(targetObj.id);
            if (!user)
              return errorResponse(req, res, 403, AppMessage.unauthorized);

            (req as any).user = user.dataValues;
            next();
          } else return errorResponse(req, res, 403, AppMessage.unauthorized);
        }
      },
    );
  } catch (error) {
    console.error({ error });
    return errorResponse(req, res, 403, AppMessage.unauthorized);
  }

  // next();
};

export default jwt_auth;

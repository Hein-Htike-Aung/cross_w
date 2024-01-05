import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import jwt, { Algorithm } from 'jsonwebtoken';
import Crypto from 'crypto';

export default class AuthService {
  static encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(
      process.env.SALT ? +process.env.SALT : 10,
    );

    return bcrypt.hashSync(password, salt);
  };

  static validateUser = async <T extends { id: number; password: string }>(
    targetObj: T,
    password: string,
  ) => {
    if (!targetObj || !bcrypt.compareSync(password, targetObj.password))
      return false;
    else return true;
  };

  static generateAuthToken = <T extends { id: number; password: string }>(
    targetObj: any,
    type: string,
  ) => {
    const access_token = jwt.sign(
      { id: targetObj.id, type },
      process.env.ACCESS_TOKEN_SECRET || 'Secret',
      {
        algorithm: process.env.TOKEN_ALGORITHM as Algorithm,
        expiresIn: process.env.TOKEN_EXPIRES_IN as string,
      },
    );

    const refresh_token = jwt.sign(
      { id: targetObj.id, type },
      process.env.ACCESS_TOKEN_SECRET || 'Secret',
      {
        algorithm: process.env.TOKEN_ALGORITHM as Algorithm,
        expiresIn: process.env.TOKEN_EXPIRES_IN as string,
      },
    );

    return { access_token, refresh_token };
  };
}

import { Sequelize } from 'sequelize-typescript';
import Township from './township.model';

export const sequelize = new Sequelize({
  pool: {
    max: 500,
    min: 100,
    acquire: 30000,
    idle: 10000,
  },
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  models: [Township],
});

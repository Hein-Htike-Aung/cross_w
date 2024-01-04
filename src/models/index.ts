'use strict';

const Sequelize = require('sequelize');
const db: any = {};

export let sequelize: any;

sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTION,
  timezone: process.env.TZ,
  logging: false,
  // retry: {
  //   match: [/Deadlock/i],
  //   max: 3, // Maximum rety 3 times
  //   backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
  //   backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
  // },
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 1200000000,
  //   idle: 100000000,
  // },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

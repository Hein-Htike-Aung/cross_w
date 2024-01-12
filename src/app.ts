import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import fileUpload from 'express-fileupload';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import { model_list } from './utils/model_list';
import { fileUploadRoutes } from './modules/file_upload';
import rateLimit from 'express-rate-limit';
import AuthRouter from './modules/auth/routes/auth.route';
import UserRouter from './modules/user/routes/user.route';
import TownshipRouter from './modules/township/routes/township.route';
import VersionRouter from './modules/version/routes/version.route';
import PlaceRouter from './modules/place/routes/place.router';
import UserFavoritePlaceRouter from './modules/place/routes/user_favorite_place.route';
import DefaultImageRouter from './modules/default_image/routes/default_image.route';
import NotificationRouter from './modules/notification/routes/notification.route';
import PlaceOwnerRouter from './modules/place/routes/place_owner.route';
import DashboardRouter from './modules/dashboard/routes/dashboard.route';

const app = express();

model_list;

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 100,
// });

// app.use(limiter);

app.use(
  cors({
    origin: ['*'],
  }),
);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
);

app.use('/api', AuthRouter);
app.use('/api', UserRouter);
app.use('/api', TownshipRouter);
app.use('/api', VersionRouter);
app.use('/api', PlaceRouter);
app.use('/api', UserFavoritePlaceRouter);
app.use('/api', DefaultImageRouter);
app.use('/api', NotificationRouter);
app.use('/api', PlaceOwnerRouter);
app.use('/api', DashboardRouter);

fileUploadRoutes(app);

app.use(notFound);
app.use(errorHandler);

export default app;

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

const app = express();

model_list;

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

app.use(notFound);
app.use(errorHandler);

export default app;

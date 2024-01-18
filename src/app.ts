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
import rateLimit from 'express-rate-limit';
import PaymentRouter from './modules/payment/routes/payment.route';
import CustomerOrderRouter from './modules/payment/routes/order.route';

const app = express();

model_list;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
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

app.use('/api', PaymentRouter);
app.use('/api', CustomerOrderRouter);

app.use(notFound);
app.use(errorHandler);

export default app;

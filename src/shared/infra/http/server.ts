import 'reflect-metadata';
import  express, {  NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import cors from 'cors';
import AppError from '@shared/error/AppError';
import { routes } from './routes';
import '@shared/container';

import '../typeorm/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;


app.use(express.json());
app.use(cors());
app.use(routes);


app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({status: 'error', message: error.message});
  }
  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(`Api running 🚀 on port ${port}`);
});









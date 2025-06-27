import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import { logRoutes } from './bootstrap/log-routers';
import { appConfig } from './config';
import { NotFoundException } from './exceptions';
import logger from './logger/pino.logger';
import { errorHandler } from './middlewares/error-handler';
import taskRouter from './modules/task/task.router';
import userRouter from './modules/user/user.router';

dotenv.config();

const server = express();
server.use(express.json()); // Включаем парсер тела

server.use('/user', userRouter);
server.use('/task', taskRouter);

server.post('*', (req, res) => {
  throw new NotFoundException();
});

server.use(errorHandler);

const port = appConfig.port;

logRoutes(server);

server.get('', (req, res) => {
  console.log('Начало обработки запроса!');
  res.send('Hello World!');
});

server.listen(port, () => {
  logger.info(`Это победа 🎉🎉🎉 ${port}...`);
});

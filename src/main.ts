import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { logRoutes } from './bootstrap/log-routers';
import { envDto } from './config/dto/envDto';
import logger from './logger/pino.logger';
import { errorHandler } from './middlewares/error-handler';
import taskRouter from './modules/task/task.router';
import userRouter from './modules/user/user.router';
import { validate } from './validate';

const server = express();
server.use(express.json()); // Включаем парсер тела

server.use('/user', userRouter);

server.use('/task', taskRouter);
server.use(errorHandler);

dotenv.config();

const port = Number(process.env.PORT);

logRoutes(server);
server.get('', (req, res) => {
  console.log('Начало обработки запроса!');
  validate(envDto, port);
  res.send('Hello World!');
});

server.listen(port, () => {
  logger.info(`Это победа 🎉🎉🎉 ${port}...`);
});

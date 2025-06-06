import 'reflect-metadata';
import express from 'express';
import { logRoutes } from './bootstrap/log-routers';
import logger from './logger/pino.logger';
import { errorHandler } from './middlewares/error-handler';
import taskRouter from './modules/task/task.router';
import userRouter from './modules/user/user.router';

const server = express();

server.use(express.json()); // Включаем парсер тела

server.use('/user', userRouter);
server.use('/task', taskRouter);

server.use(errorHandler);

const port = 2000;

logRoutes(server);

server.get('', (req, res) => {
  console.log('Начало обработки запроса!');
  res.send('Hello World!');
});

server.listen(port, () => {
  logger.info(`Это победа 🎉🎉🎉 ${port}...`);
});

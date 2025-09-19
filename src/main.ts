import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import { Container } from 'inversify';
import { logRoutes } from './bootstrap/log-routers';
import CacheModule from './cache/cache.module';
import { appConfig } from './config';
import { connectToPostgres } from './database';
import { NotFoundException } from './exceptions';
import logger from './logger/pino.logger';
import { errorHandler } from './middlewares/error-handler';
import { TaskController } from './modules/task/task.controller';
import TaskModule from './modules/task/task.module';
import { UserController } from './modules/user/user.controller';
import UserModule from './modules/user/user.module';

const bootstrap = async () => {
  await connectToPostgres();
  const appContainer = new Container();
  appContainer.loadSync(TaskModule, UserModule, CacheModule);

  const server = express(); // создаем сервер
  server.use(express.json()); // Включаем парсер тела
  server.use(cors({ origin: '*' }));

  const taskController = appContainer.get(TaskController);
  const userController = appContainer.get(UserController);

  server.use('/task', taskController.router);
  server.use('/user', userController.router);

  server.post('*', (req, res) => {
    throw new NotFoundException();
  });

  server.use(errorHandler);

  const port = appConfig.port;

  logRoutes(server);

  server.listen(port, () => {
    logger.info(`Это победа 🎉🎉🎉 ${port}...`);
  });
};

bootstrap();

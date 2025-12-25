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
import { DepartmentController } from './modules/department/department.controller';
import DepartmentModule from './modules/department/department.module';
import { MailController } from './modules/mail/mail.controller';
import MailModule from './modules/mail/mail.module';
import { TaskController } from './modules/task/task.controller';
import TaskModule from './modules/task/task.module';
import TelegramModule from './modules/telegram/telegram.module';
import { UserController } from './modules/user/user.controller';
import UserModule from './modules/user/user.module';

const bootstrap = async () => {
  await connectToPostgres();
  const appContainer = new Container();
  appContainer.loadSync(TaskModule, UserModule, CacheModule, DepartmentModule, TelegramModule, MailModule);

  const server = express(); // создаем сервер
  server.use(cors({ origin: '*' }));
  server.use(express.json()); // Включаем парсер тела

  const taskController = appContainer.get(TaskController);
  const userController = appContainer.get(UserController);
  const departmentController = appContainer.get(DepartmentController);
  const mailController = appContainer.get(MailController);

  server.use('/task', taskController.router);
  server.use('/user', userController.router);
  server.use('/department', departmentController.router);
  server.use('/mail', mailController.router);

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

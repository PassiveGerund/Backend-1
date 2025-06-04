import express from 'express';
import { logRoutes } from './bootstrap/log-routers';
import logger from './logger/pino.logger';
import { middleware1 } from './middlewares';
import taskRouter from './modules/task.router';
import userRouter from './modules/user.router';

const server = express();

server.use('/user', middleware1);
server.use('/user', userRouter);

server.use('/task', taskRouter);

server.use(express.json()); // Включаем парсер тела

const port = 2000;

logRoutes(server);

// server.use(middleware1);
// server.use(middleware2);
// server.use(middleware3);

server.get('', (req, res) => {
  console.log('Начало обработки запроса!');
  res.send('Hello World!');
});

server.listen(port, () => {
  logger.info(`Это победа 🎉🎉🎉 ${port}...`);
});

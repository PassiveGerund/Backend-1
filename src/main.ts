import express from 'express';
import { logRoutes } from './bootstrap/log-routers';
import logger from './logger/pino.logger';
import taskRouter from './task.router';
import userRouter from './user.router';

const server = express();
server.use('/user', userRouter);
server.use('/task', taskRouter);

server.use(express.json()); // Включаем парсер тела

const port = 2000;

server.get('/', (req, res) => {
  logger.info('Главная страница');
  res.json({ key: 'value123' });
});

server.post('', (req, res) => {
  // console.log('Пришло тело:');
  // console.log(req.body);
  const body = JSON.stringify(req.body);
  logger.info(`Пришло тело: ${body}  !`);
  res.send(`Пришло тело: ${body}`);
});

logRoutes(server);

server.listen(port, () => {
  logger.info(`Это победа 🎉🎉🎉 ${port}...`);
});

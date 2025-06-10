import express from 'express';
import logger from '../../logger/pino.logger';
import { validate } from '../../validate';
import { CreateTastDto } from './dto/CreateTastDto';

const taskRouter = express.Router();

taskRouter.get('', (req, res) => {
  logger.info('Список задач');
  res.send('Список задач');
});
taskRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  logger.info(`Задача ${id}`);
  res.send(`Задача ${id}`);
});
taskRouter.post('', (req, res) => {
  const params = req.body;
  validate(CreateTastDto, req.body);
  logger.info(params);
  logger.info('Пришел запрос с методом POST. Создать задачу');
  res.send('Пришел запрос с методом POST. Создать задачу');
});

taskRouter.get('/my/authored', (req, res) => {
  logger.info(`Список своих созданных задач`);
  res.send('Список своих созданных задач');
});

taskRouter.get('/my/assigned', (req, res) => {
  logger.info(`Список своих назначенных задач`);
  res.send('Список своих назначенных задач');
});

taskRouter.put('/:id', (req, res) => {
  const id: string = req.params.id;
  logger.info(`Пришел запрос с методом PUT. Обновить задачу ${id}`);
  res.send(`Пришел запрос с методом PUT. Обновить задачу ${id}`);
});

taskRouter.delete('/:id', (req, res) => {
  const id: string = req.params.id;
  logger.info(`Пришел запрос с методом DELETE. Обновить задачу ${id} `);
  res.send(`Пришел запрос с методом DELETE. Обновить задачу ${id}, `);
});

export default taskRouter;

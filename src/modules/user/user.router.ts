import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import express from 'express';
import logger from '../../logger/pino.logger';
import { RegisterUserDto } from './dto';

const userRouter = express.Router();
userRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  if (typeof id !== 'number') {
    res.send('Error: Id should be number');
    return;
  }
  res.send(typeof id);

  logger.info(`Пользователь ${id}, держите новости!`);
  res.send(`Пользователь ${id}, держите новости!`);
});

userRouter.get('/:id/news/:newsId', (req, res) => {
  const id: string = req.params.id;
  const newsId: string = req.params.newsId;
  logger.info(`Держите новости ${id}  ${newsId}!`);
  res.send(`Держите новости ${id}  ${newsId}!`);
});

userRouter.get('', (req, res) => {
  logger.info(`Список пользователей`);
  res.send(`Список пользователей`);
});

userRouter.post('', (req, res) => {});

userRouter.post('/register', (req, res) => {
  logger.info(`Запрос на регистрацию`);

  const dto = plainToInstance(RegisterUserDto, req.body);
  const errors = validateSync(dto);
  if (errors.length) {
    const [{ constraints }] = errors;

    if (constraints) {
      throw new Error(constraints[Object.keys(constraints)[0]]);
    }

    throw new Error('Неизвестная ошибка');
  }

  console.log(dto);

  res.send(`Запрос на регистрацию`);
});

userRouter.delete('', (req, res) => {});

export default userRouter;

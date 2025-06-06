import express from 'express';
import logger from '../../logger/pino.logger';
import { validate } from '../../validate';
import { LoginUserDto, RegisterUserDto } from './dto';

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

userRouter.get('', (req, res) => {
  logger.info(`Список пользователей`);
  res.send(`Список пользователей`);
});

userRouter.post('', (req, res) => {});

userRouter.post('/login', (req, res) => {
  logger.info(`Логин`);

  const dto = validate(LoginUserDto, req.body);

  console.log(dto);

  res.send(`Запрос на вход`);
});

userRouter.post('/register', (req, res) => {
  logger.info(`Запрос на регистрацию`);

  const dto = validate(RegisterUserDto, req.body);

  console.log(dto);

  res.send(`Запрос на регистрацию`);
});

userRouter.delete('', (req, res) => {});

export default userRouter;

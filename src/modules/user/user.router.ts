import express from 'express';
import logger from '../../logger/pino.logger';
import { validate } from '../../validate';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

const userRouter = express.Router();
userRouter.get('/:id', (req, res) => {
  const { id } = req.params;

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
  const params = req.body;
  const dto = validate(RegisterUserDto, req.body);
  logger.info(req.body);
  logger.info(`Запрос на регистрацию `);
  res.send(`Запрос на регистрацию `);
});

userRouter.post('/login', (req, res) => {
  const params = req.body;
  validate(LoginUserDto, req.body);
  logger.info(`Авторизация`);
  logger.info(params);
  res.send(`Авторизация`);
});

userRouter.delete('', (req, res) => {});

export default userRouter;

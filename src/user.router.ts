import express from 'express';
import logger from './logger/pino.logger';

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
userRouter.get('/:id/friends', (req, res) => {
  const id: string = req.params.id;
  logger.info(`Друзья пользователя ${id}`);
  res.send(`Друзья пользователя ${id}`);
});
userRouter.get('/:id/audios', (req, res) => {
  const id: string = req.params.id;
  logger.info(`Аудио пользователя ${id}`);
  res.send(`Аудио пользователя ${id}`);
});
userRouter.get('/:id/photos', (req, res) => {
  const id: string = req.params.id;
  logger.info(`Фото пользователя ${id}`);
  res.send(`Фото пользователя ${id}`);
});

userRouter.post('', (req, res) => {});
userRouter.delete('', (req, res) => {});

export default userRouter;

import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { appConfig } from '../config';
import { UserEntity } from '../database/entities';
import { UnauthorizedException } from '../exceptions';

// это ф/я jsonwebtoken которая будет проверять токен
export const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  // в header записывается header, пришешдший из логина
  // authorization мы получаем с фронтенда
  // в header записываем Bearerтокен?
  const header = req.headers['authorization'];
  if (!header) {
    throw new UnauthorizedException(); // Unauthorized
  }

  // и тут убираем bearer
  const token = header.split(' ')[1];

  try {
    // добавляем наше кодовое слово и проверяем на совпадение
    verify(token, appConfig.secret); // <-- секрет из env!
  } catch (error) {
    throw new UnauthorizedException(); // Unauthorized
  }

  // переводим строку в json формат?
  const payload = decode(token, { json: true });
  if (!payload) {
    throw new UnauthorizedException(); // Unauthorized
  }

  const user = await UserEntity.findOne({ where: { id: payload.id } });
  if (!user) {
    throw new UnauthorizedException(); // Unauthorized
  }

  // записываем в временное хранилище бекенда
  res.locals.user = user;

  // чтобы в user controller сработал после AuthGuard дальше запрос
  // this.router.get('/profile', AuthGuard, (req, res) => this.getUserProfile(req, res));
  next();
};

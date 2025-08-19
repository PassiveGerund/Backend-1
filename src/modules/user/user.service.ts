import { injectable } from 'inversify';
import { UserEntity } from '../../database/entities';
import { BadRequestException, NotFoundException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { LoginUserDto, RegisterUserDto, UserIdDto } from './dto';

@injectable()
export class UserService {
  async register(data: RegisterUserDto) {
    logger.info('Регистрация пользователя');

    const exist = await UserEntity.findOne({
      where: { email: data.email },
    });
    if (exist) {
      throw new BadRequestException(`Пользователь с email ${data.email} уже зарегистрирован`);
    }
    const user = await UserEntity.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return user;
  }

  getUserId(dto: UserIdDto) {
    logger.info('Получить пользователя по id');
    return { ...dto };
  }
  // Авторизация пользователя
  async postUserLogin(dto: LoginUserDto) {
    logger.info('Авторизация пользователя');

    const exist = await UserEntity.findOne({
      where: { email: dto.email },
    });
    if (!exist) {
      throw new NotFoundException(`Пользователь с email ${dto.email} не найден.`);
    }

    return exist;
  }
  deleteUser() {
    logger.info('Удаляем пользователя');
    return {};
  }
}

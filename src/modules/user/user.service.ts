import { injectable } from 'inversify';
import logger from '../../logger/pino.logger';
import { LoginUserDto, RegisterUserDto, UserIdDto } from './dto';

@injectable()
export class UserService {
  register(dto: RegisterUserDto) {
    logger.info('Регистрация пользователя');
    return { id: 1, ...dto };
  }

  getUserId(dto: UserIdDto) {
    logger.info('Получить пользователя по id');
    return { ...dto };
  }

  postUserLogin(dto: LoginUserDto) {
    logger.info('Логиним пользователя');
    return { ...dto };
  }
  deleteUser() {
    logger.info('Удаляем пользователя');
    return {};
  }
}

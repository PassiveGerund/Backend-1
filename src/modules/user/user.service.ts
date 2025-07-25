import { injectable } from 'inversify';
import logger from '../../logger/pino.logger';
import { RegisterUserDto } from './dto';

@injectable()
export class UserService {
  register(dto: RegisterUserDto) {
    logger.info('Регистрация пользователя');
    return { id: 1, ...dto };
  }
}

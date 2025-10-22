import { compare, hash } from 'bcryptjs';
import { injectable } from 'inversify';
import { DepartmentEntity, UserEntity } from '../../database/entities';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { LoginUserDto, RegisterUserDto, UserIdDto } from './dto';

@injectable()
export class UserService {
  // Регистрация пользователя
  async register(data: RegisterUserDto) {
    logger.info('Регистрация пользователя');

    const exist = await UserEntity.findOne({
      where: { email: data.email },
    });
    if (exist) {
      throw new BadRequestException(`Пользователь с email ${data.email} уже зарегистрирован`);
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await UserEntity.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      department: data.department,
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
      include: [{ model: DepartmentEntity, attributes: ['id', 'title'] }],
    });
    if (!exist) {
      throw new NotFoundException(`Пользователь с email ${dto.email} не найден.`);
    }

    const passwordAreEquals = await compare(dto.password, exist.password);
    if (!passwordAreEquals) {
      throw new UnauthorizedException('Пользователь не найден!'); // unauthorized
    }
    return exist;
  }
  deleteUser() {
    logger.info('Удаляем пользователя');
    return {};
  }
}

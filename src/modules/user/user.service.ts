import { compare, hash } from 'bcryptjs';
import { injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { appConfig } from '../../config';
import { DepartmentEntity, UserEntity } from '../../database/entities';
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { LoginUserDto, RegisterUserDto, UserIdDto } from './dto';

@injectable()
export class UserService {
  // Регистрация пользователя
  async register(data: RegisterUserDto) {
    logger.info('Регистрация пользователя');

    // есть ли такой пользователь по email
    const exist = await UserEntity.findOne({
      where: { email: data.email },
    });
    if (exist) {
      throw new BadRequestException(`Пользователь с email ${data.email} уже зарегистрирован`);
    }

    // есть ли такой департамент в базе
    const existdep = await DepartmentEntity.findOne({
      where: { id: data.departmentId },
    });
    if (!existdep) {
      throw new BadRequestException(`Департамента ${data.departmentId} не существует`);
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await UserEntity.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      departmentId: data.departmentId,
    });
    return user;
  }

  getUserId(dto: UserIdDto) {
    logger.info('Получить пользователя по id');
    return { ...dto };
  }

  // блокировка пользователя
  async changeIsActive(userId: string, newIsActive: boolean) {
    await UserEntity.update({ isActive: newIsActive }, { where: { id: userId } });
    if (newIsActive) {
      logger.info(`Пользователь разблокирован  `);
    } else {
      logger.info(`Пользователь заблокирован  `);
      await UserEntity.update({ blockReason: 'причина блокировки как сюда вписать?' }, { where: { id: userId } });
      // а как менять значение blockReason?
    }

    return { success: true, blockReason: 'причина блокировки как сюда вписать?' };
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

    if (exist.isActive === false) {
      throw new ForbiddenException('Пользователь заблокирован');
    }

    const passwordAreEquals = await compare(dto.password, exist.password);
    if (!passwordAreEquals) {
      throw new UnauthorizedException('Пользователь не найден!'); // unauthorized
    }
    // return exist;
    // теперь перед после авторизации создаем токен:
    // функцией sign из jsonbtoken. Она берет id пользователя, любое секретное слово и время жизни токена
    const accessToken = sign({ id: exist.id }, appConfig.secret, { expiresIn: '1h' }); // <-- секрет в переменных окружения!
    // и возвращает токен
    return { accessToken };
  }
  deleteUser() {
    logger.info('Удаляем пользователя');
    return {};
  }
}

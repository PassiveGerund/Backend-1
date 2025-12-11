import { compare, hash } from 'bcryptjs';
import { CronJob } from 'cron';
import { injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { appConfig } from '../../config';
import { DepartmentEntity, UserEntity } from '../../database/entities';
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { LoginUserDto, RegisterUserDto, UserIdDto } from './dto';

@injectable()
export class UserService {
  private readonly updateDomainsJob = new CronJob('0 8 * * * *', () => this.loadDomains(), null, true);
  tmpDomains: string[] = []; // что такое string[] ?

  constructor() {
    this.loadDomains();
  }

  async loadDomains() {
    // запрашиваем список одноразовых доментов
    const response = await fetch(
      'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/refs/heads/main/disposable_email_blocklist.conf',
    );
    const domains = await response.text();
    this.tmpDomains = domains.split('\n');
    logger.info(`Загружен список из ${this.tmpDomains.length} доменов `);
  }

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

    // проверяем указанную почту по базе одноразовых доменов
    if (this.tmpDomains.includes(data.email.split('@')[1])) {
      throw new BadRequestException('Email в списке одноразовых доменов');
    }
    // проверки прошли, хэшируем пароль
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
  async changeIsActive(userId: string, blockReason: string, newIsActive: boolean) {
    await UserEntity.update({ isActive: newIsActive, blockReason: blockReason }, { where: { id: userId } });
    if (newIsActive) {
      logger.info(`Пользователь разблокирован  `);
    } else {
      logger.info(`Пользователь заблокирован  `);
    }

    return { success: true, blockReason: blockReason };
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

import { inject, injectable } from 'inversify';
import { CacheService } from '../../cache/cache.service';
import { UserEntity } from '../../database/entities';
import { DepartmentEntity } from '../../database/entities/department.entity';
import { NotFoundException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { TelegramService } from '../telegram/telegram.service';
import { CreateDepartmentDto, DepartmentIdDto } from './dto';

@injectable()
export class DepartmentService {
  constructor(
    @inject(CacheService) private readonly cacheService: CacheService,
    private readonly telegramService: TelegramService,
  ) {}

  // Создание департамета
  async create(dto: CreateDepartmentDto, authorId: number) {
    logger.info('Создание нового департамента');

    const department = await DepartmentEntity.create({
      title: dto.title,
      description: dto.description,
      authorId: authorId,
    });

    // отправляем админам уведомление в телеграм:
    const admins = await UserEntity.findAll({ where: { role: ['admin'] } });
    const author = await UserEntity.findOne({ where: { id: authorId } });

    for (const admin of admins) {
      if (admin.tg !== null) {
        await this.telegramService.bot.telegram.sendMessage(
          admin.tg,
          `Создан новый департамент   ${department.title} \n автор ${author} видимо он нашел весь объект юзера, а как получить только имя?`,
        );
      }
    }

    return department;
  }

  // Получить департамент по ID
  async getDepartmentById(idobject: DepartmentIdDto) {
    logger.info(`Получение нового департамента  по id ${idobject.id}`);

    const cached = await this.cacheService.redis.get(`department-${idobject.id}`);
    if (cached) {
      return JSON.parse(cached);
    }
    const department = await DepartmentEntity.findOne({
      where: { id: idobject.id },
    });
    if (!department) {
      throw new NotFoundException(`Департамента с ID = ${idobject.id} не найдено`);
    }

    await this.cacheService.redis.set(`department-${idobject.id}`, JSON.stringify(department), { EX: 300 });

    return department;
  }

  // Удалить департамент по ID
  async deleteDepartmenById(data: DepartmentIdDto) {
    logger.info(`Delete запрос на ${data.id} департамента`);

    await this.getDepartmentById(data);
    const task = await DepartmentEntity.destroy({
      where: { id: data.id },
    });
    await this.cacheService.redis.del(`department-${data.id}`);
    return `Департамент ${data.id} удален`;
  }
}

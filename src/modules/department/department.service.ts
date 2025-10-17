import { inject, injectable } from 'inversify';
import { CacheService } from '../../cache/cache.service';
import { DepartmentEntity } from '../../database/entities/department.entity';
import { NotFoundException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { CreateDepartmentDto, DepartmentIdDto } from './dto';

@injectable()
export class DepartmentService {
  constructor(@inject(CacheService) private readonly cacheService: CacheService) {}

  // Создание департамета
  async create(dto: CreateDepartmentDto) {
    logger.info('Создание нового департамента');

    const department = await DepartmentEntity.create({
      title: dto.title,
      description: dto.description,
    });
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

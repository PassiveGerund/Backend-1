import { inject, injectable } from 'inversify';
import { Op } from 'sequelize';
import { CacheService } from '../../cache/cache.service';
import { DepartmentEntity, TaskEntity, UserEntity } from '../../database/entities';
import { NotFoundException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { CreateTaskDto, GetTaskDto, TaskIdDto, UpdateTaskDto } from './dto';

@injectable()
export class TaskService {
  constructor(@inject(CacheService) private readonly cacheService: CacheService) {}

  // Создание задачи
  async create(dto: CreateTaskDto) {
    logger.info('Создание новой задачи');

    // проверка есть ли пользователь assignUser в базе
    const userexist = await UserEntity.findOne({
      where: { id: dto.assignUserId },
    });

    if (!userexist) {
      throw new NotFoundException(`Пользователя с ID = ${dto.assignUserId} не найдено`);
    }

    const task = await TaskEntity.create({
      title: dto.title,
      description: dto.description,
      assignId: dto.assignUserId,
    });

    return task;
  }

  // Получить задачу по ID
  async getTaskById(idobject: TaskIdDto) {
    logger.info(`Получение новой задачи  по id ${idobject.id}`);

    const cached = await this.cacheService.redis.get(`task-${idobject.id}`);
    if (cached) {
      return JSON.parse(cached);
    }

    // из базы
    const task = await TaskEntity.findOne({
      where: { id: idobject.id },
      include: [
        {
          model: UserEntity,
          attributes: ['id', 'name', 'email'],
          include: [{ model: DepartmentEntity, attributes: ['id', 'title'] }],
        },
      ], // выводит информацию о пользователе-исполнителе задачи
    });
    if (!task) {
      throw new NotFoundException(`Задачи с ID = ${idobject.id} не найдено`);
    }

    await this.cacheService.redis.set(`task-${idobject.id}`, JSON.stringify(task), { EX: 300 });

    return task;
  }

  // Получить все задачи
  async getTasks(query: GetTaskDto) {
    logger.info('Список задач');

    let where = {};

    if (query.search) {
      where = {
        [Op.or]: [{ title: { [Op.iLike]: `%${query.search}%` } }, { description: { [Op.iLike]: `%${query.search}%` } }],
      };
    }
    const tasks = await TaskEntity.findAndCountAll({
      order: [[query.sortBy, query.sortDirection]],
      where,
      include: [{ model: UserEntity, attributes: ['id', 'name', 'email'] }], // выводит информацию о пользователе-исполнителе задачи
      limit: query.limit,
      offset: query.offset,
    });

    if (!tasks) {
      throw new NotFoundException(`Задач не найдено`);
    }
    return {
      total: tasks.count,
      search: query.search,
      limit: query.limit,
      offset: query.offset,
      data: tasks.rows,
    };
  }

  // Удалить задачу по ID
  async deleteTasksId(data: TaskIdDto) {
    logger.info(`Delete запрос на ${data.id} задачи`);

    await this.getTaskById(data);
    const task = await TaskEntity.destroy({
      where: { id: data.id },
    });
    await this.cacheService.redis.del(`task-${data.id}`);
    return `Задача ${data.id} удалена`;
  }

  // Обновить задачу
  async putTasksId(idobject: TaskIdDto, data: UpdateTaskDto) {
    logger.info(`Обновление ${idobject.id} задачи`);
    await this.getTaskById(idobject);
    const task = await TaskEntity.update(
      { title: data.title, description: data.description },
      {
        where: { id: idobject.id },
      },
    );
    await this.cacheService.redis.del(`task-${idobject.id}`);
    return data;
  }

  getMyAuthored() {
    logger.info('Список своих созданных задач');
    return { id: 1 };
  }

  getMyAssigned() {
    logger.info('Список своих назначенных задач');
    return { id: 1 };
  }
}

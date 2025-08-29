import { injectable } from 'inversify';
import { Op, WhereOptions } from 'sequelize';
import { TaskEntity } from '../../database/entities';
import { NotFoundException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { CreateTaskDto, GetTaskDto, TaskIdDto, UpdateTaskDto } from './dto';

@injectable()
export class TaskService {
  // Создание задачи
  async create(dto: CreateTaskDto) {
    logger.info('Создание новой задачи');

    const task = await TaskEntity.create({
      title: dto.title,
      description: dto.description,
    });
    return task;
  }

  // Получить задачу по ID
  async getTaskById(idobject: TaskIdDto) {
    logger.info(`Получение новой задачи  по id ${idobject.id}`);
    const task = await TaskEntity.findOne({
      where: { id: idobject.id },
    });
    if (!task) {
      throw new NotFoundException(`Задачи с ID = ${idobject.id} не найдено`);
    }
    return task;
  }

  // Получить все задачи
  async getTasks(query: GetTaskDto) {
    logger.info('Список задач');

    let where: WhereOptions<TaskEntity> = {};

    if (query.search) {
      const value = `%${query.search}%`;

      where = {
        [Op.or]: [{ title: { [Op.iLike]: value } }, { description: { [Op.iLike]: value } }],
      };
    }

    // Если search передан => ищем по совпадению в имени или описании
    const result = await TaskEntity.findAndCountAll({
      order: [[query.sortBy, query.sortDirection]],
      where,
      limit: query.limit,
      offset: query.offset,
    });

    return {
      total: result.count,
      search: query.search,
      limit: query.limit,
      offset: query.offset,
      data: result.rows,
    };
  }

  // Удалить задачу по ID
  async deleteTasksId(data: TaskIdDto) {
    logger.info(`Delete запрос на ${data.id} задачи`);
    await this.getTaskById(data);
    const task = await TaskEntity.destroy({
      where: { id: data.id },
    });
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

import { injectable } from 'inversify';
import { TaskEntity } from '../../database/entities';
import { NotFoundException } from '../../exceptions';
import logger from '../../logger/pino.logger';
import { CreateTaskDto, TaskIdDto, UpdateTaskDto } from './dto';

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
  async getTaskId(data: TaskIdDto) {
    logger.info(`Получение новой задачи  по id ${data.id}`);
    const task = await TaskEntity.findOne({
      where: { id: data.id },
    });
    if (!task) {
      throw new NotFoundException(`Задачи с ID = ${data.id} не найдено`);
    }
    return task;
  }

  // Получить все задачи
  async getTasks() {
    logger.info('Список задач');
    const tasks = await TaskEntity.findAll();
    if (!tasks) {
      throw new NotFoundException(`Задач не найдено`);
    }
    return tasks;
  }

  // Удалить задачу по ID
  async deleteTasksId(data: TaskIdDto) {
    logger.info(`Delete запрос на ${data.id} задачи`);
    const task = await TaskEntity.destroy({
      where: { id: data.id },
    });
    if (!task) {
      throw new NotFoundException(`Задачи с ID = ${data.id} не найдено, не могу удалить`);
    }
    return `Задача ${data.id} удалена`;
  }

  // Обновить задачу
  async putTasksId(idobject: TaskIdDto, data: UpdateTaskDto) {
    logger.info(`Обновление ${idobject.id} задачи`);
    const task = await TaskEntity.update(
      { title: data.title, description: data.description },
      {
        where: { id: idobject.id },
      },
    );

    if (!task) {
      throw new NotFoundException(`Задачи с ID = ${idobject.id} не найдено, не могу обновить`);
    }

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

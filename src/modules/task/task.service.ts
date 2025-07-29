import { injectable } from 'inversify';
import logger from '../../logger/pino.logger';
import { CreateTaskDto, TaskIdDto } from './dto';

@injectable()
export class TaskService {
  create(dto: CreateTaskDto) {
    logger.info('Создание новой задачи');
    return { id: 1, ...dto };
  }

  getTasks() {
    logger.info('Список задач new');
    return { id: 1 };
  }

  getTaskId(dto: TaskIdDto) {
    logger.info(`Создание новой задачи  по id ${dto.id}`);
    return { ...dto };
  }

  getMyAuthored() {
    logger.info('Список своих созданных задач');
    return { id: 1 };
  }

  getMyAssigned() {
    logger.info('Список своих назначенных задач');
    return { id: 1 };
  }

  putTasksId(dto: TaskIdDto) {
    logger.info(`Put запрос на ${dto.id} задачи`);
    return { ...dto };
  }

  deleteTasksId(dto: TaskIdDto) {
    logger.info(`Delete запрос на ${dto.id} задачи`);
    return { ...dto };
  }
}

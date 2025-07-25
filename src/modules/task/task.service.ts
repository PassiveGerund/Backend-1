import { injectable } from 'inversify';
import logger from '../../logger/pino.logger';
import { CreateTaskDto } from './dto';

@injectable()
export class TaskService {
  create(dto: CreateTaskDto) {
    logger.info('Создание новой задачи');
    return { id: 1, ...dto };
  }
}

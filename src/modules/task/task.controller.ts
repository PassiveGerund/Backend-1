import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { validate } from '../../validate';
import { CreateTaskDto } from './dto';
import { TaskService } from './task.service';

@injectable()
export class TaskController {
  public readonly router = Router();

  constructor(@inject(TaskService) private readonly service: TaskService) {
    this.router.post('/', (req, res) => this.create(req, res));
  }

  create(req: Request, res: Response) {
    const dto = validate(CreateTaskDto, req.body);
    const result = this.service.create(dto);
    res.json(result);
  }
}

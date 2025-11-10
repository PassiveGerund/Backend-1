import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../../guard';
import { validate } from '../../validate';
import { CreateTaskDto, TaskIdDto, UpdateTaskDto } from './dto';
import { GetTaskDto } from './dto/get-task.dto';
import { TaskService } from './task.service';

@injectable()
export class TaskController {
  public readonly router = Router();

  constructor(@inject(TaskService) private readonly service: TaskService) {
    this.router.post('/', AuthGuard, (req, res) => this.create(req, res));
    this.router.get('', (req, res) => this.getTasks(req, res));
    this.router.get('/:id', (req, res) => this.getTaskById(req, res));
    this.router.get('/my/authored', (req, res) => this.getMyAuthored(req, res));
    this.router.get('/my/assigned', (req, res) => this.getMyAssigned(req, res));
    this.router.put('/:id', (req, res) => this.updateTaskById(req, res));
    this.router.delete('/:id', (req, res) => this.deleteTaskById(req, res));
  }

  async create(req: Request, res: Response) {
    const dto = validate(CreateTaskDto, req.body);
    const result = await this.service.create(dto, res.locals.user.id);
    res.json(result);
  }

  async getTasks(req: Request, res: Response) {
    const query = validate(GetTaskDto, req.query);
    const result = await this.service.getTasks(query);
    res.json(result);
  }

  async getTaskById(req: Request, res: Response) {
    const id = validate(TaskIdDto, req.params);
    const result = await this.service.getTaskById(id);
    res.json(result);
  }

  getMyAuthored(req: Request, res: Response) {
    const result = this.service.getMyAuthored();
    res.json(result);
  }

  getMyAssigned(req: Request, res: Response) {
    const result = this.service.getMyAssigned();
    res.json(result);
  }

  async updateTaskById(req: Request, res: Response) {
    const id = validate(TaskIdDto, req.params);
    const data = validate(UpdateTaskDto, req.body);
    const result = await this.service.putTasksId(id, data);
    res.json(result);
  }

  async deleteTaskById(req: Request, res: Response) {
    const dto = validate(TaskIdDto, req.params);
    const result = await this.service.deleteTasksId(dto);
    res.json(result);
  }
}

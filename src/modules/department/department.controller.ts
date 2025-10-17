import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { validate } from '../../validate';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, DepartmentIdDto } from './dto';

@injectable()
export class DepartmentController {
  public readonly router = Router();

  constructor(@inject(DepartmentService) private readonly service: DepartmentService) {
    this.router.post('/', (req, res) => this.create(req, res));
    this.router.delete('/:id', (req, res) => this.deleteDepartmenById(req, res));
  }

  async create(req: Request, res: Response) {
    const dto = validate(CreateDepartmentDto, req.body);
    const result = await this.service.create(dto);
    res.json(result);
  }

  async deleteDepartmenById(req: Request, res: Response) {
    const dto = validate(DepartmentIdDto, req.params);
    const result = await this.service.deleteDepartmenById(dto);
    res.json(result);
  }
}

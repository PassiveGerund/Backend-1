import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { validate } from '../../validate';
import { LoginUserDto, RegisterUserDto, UserIdDto } from './dto';
import { UserService } from './user.service';

@injectable()
export class UserController {
  public readonly router = Router();

  constructor(@inject(UserService) private readonly userService: UserService) {
    this.router.post('/register', (req, res) => this.register(req, res));
    this.router.get('/:id', (req, res) => this.getUserId(req, res));
    this.router.post('/login', (req, res) => this.postUserLogin(req, res));
    this.router.delete('', (req, res) => this.deleteUser(req, res));
  }

  register(req: Request, res: Response) {
    const dto = validate(RegisterUserDto, req.body);
    const result = this.userService.register(dto);
    res.json(result);
  }
  getUserId(req: Request, res: Response) {
    const dto = validate(UserIdDto, req.params);
    const result = this.userService.getUserId(dto);
    res.json(result);
  }

  postUserLogin(req: Request, res: Response) {
    const dto = validate(LoginUserDto, req.body);
    const result = this.userService.postUserLogin(dto);
    res.json(result);
  }

  deleteUser(req: Request, res: Response) {
    const result = this.userService.deleteUser();
    res.json(result);
  }
}

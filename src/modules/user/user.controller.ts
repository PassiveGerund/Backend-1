import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../../cache/guard/auth.guard';
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
    this.router.get('/profile', AuthGuard, (req, res) => this.getUserProfile(req, res));
  }

  async register(req: Request, res: Response) {
    const dto = validate(RegisterUserDto, req.body);
    const result = await this.userService.register(dto);
    res.json(result);
  }
  getUserId(req: Request, res: Response) {
    const dto = validate(UserIdDto, req.params);
    const result = this.userService.getUserId(dto);
    res.json(result);
  }

  async postUserLogin(req: Request, res: Response) {
    const dto = validate(LoginUserDto, req.body);
    const result = await this.userService.postUserLogin(dto);
    res.json(result);
  }

  deleteUser(req: Request, res: Response) {
    const result = this.userService.deleteUser();
    res.json(result);
  }
  getUserProfile(req: Request, res: Response) {
    // что тут происходит???
    const user = res.locals.user;
    res.json(user);
  }
}

import 'reflect-metadata';
import { IsEmail } from 'class-validator';

export class CheckEmailDTO {
  @IsEmail()
  email: string;
}
//
// const middleware1 = (req: Request, res: Response, next: NextFunction) => {
//   console.log(`Пришел запрос с методом ${req.method} на путь ${req.url}`);
//   next();
// };
// const middleware2 = (req: Request, res: Response, next: NextFunction) => {
//   console.log(`Выполнился middleware2`);
//   next();
// };
// const middleware3 = (req: Request, res: Response, next: NextFunction) => {
//   console.log(`Выполнился middleware3`);
//   next();
// };
//
// export { middleware1, middleware2, middleware3 };

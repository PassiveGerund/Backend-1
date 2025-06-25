import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class ForbiddenException extends Error {
  public readonly code = 400;

  constructor(message = 'Клиент аутентифицирован, но не авторизован') {
    super(message);
  }
}

export const forbiddenException = <T extends object, V>(cls: ClassConstructor<T>, plain: V) => {
  const dto = plainToInstance(cls, plain);
  const errors = validateSync(dto);
  if (errors.length) {
    const [{ constraints }] = errors;

    if (constraints) {
      throw new ForbiddenException();
    }

    throw new ForbiddenException();
  }

  return dto;
};

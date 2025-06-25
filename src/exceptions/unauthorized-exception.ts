import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class UnauthorizedException extends Error {
  public readonly code = 400;

  constructor(message = 'Клиент не автоизован') {
    super(message);
  }
}

export const unauthorizedException = <T extends object, V>(cls: ClassConstructor<T>, plain: V) => {
  const dto = plainToInstance(cls, plain);
  const errors = validateSync(dto);
  if (errors.length) {
    const [{ constraints }] = errors;

    if (constraints) {
      throw new UnauthorizedException();
    }

    throw new UnauthorizedException();
  }

  return dto;
};

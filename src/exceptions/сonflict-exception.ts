import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class ConflictException extends Error {
  public readonly code = 400;

  constructor(message = 'Такой email уже зарегистрирован') {
    super(message);
  }
}

export const conflictException = <T extends object, V>(cls: ClassConstructor<T>, plain: V) => {
  const dto = plainToInstance(cls, plain);
  const errors = validateSync(dto);
  if (errors.length) {
    const [{ constraints }] = errors;

    if (constraints) {
      throw new ConflictException();
    }

    throw new ConflictException();
  }

  return dto;
};

import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class BadRequestException extends Error {
  public readonly code = 400;

  constructor(message = 'Данные не прошли валидацию') {
    super(message);
  }
}

export const badRequestException = <T extends object, V>(cls: ClassConstructor<T>, plain: V) => {
  const dto = plainToInstance(cls, plain);
  const errors = validateSync(dto);
  if (errors.length) {
    const [{ constraints }] = errors;

    if (constraints) {
      throw new BadRequestException();
    }

    throw new BadRequestException();
  }

  return dto;
};

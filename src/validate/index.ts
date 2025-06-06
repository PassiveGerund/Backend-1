import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { validateSync } from 'class-validator';

export const validate = <T extends object, V>(cls: ClassConstructor<T>, plain: V) => {
  const dto = plainToInstance(cls, plain);
  const errors = validateSync(dto);
  if (errors.length) {
    const [{ constraints }] = errors;

    if (constraints) {
      throw new Error(constraints[Object.keys(constraints)[0]]);
    }

    throw new Error('Неизвестная ошибка');
  }

  return dto;
};

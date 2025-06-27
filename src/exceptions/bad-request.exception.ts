export class BadRequestException extends Error {
  public readonly code = 400;

  constructor(message = 'Данные не прошли валидацию') {
    super(message);
  }
}

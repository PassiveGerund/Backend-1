export class ForbiddenException extends Error {
  public readonly code = 403;

  constructor(message = 'Клиент аутентифицирован, но не авторизован') {
    super(message);
  }
}

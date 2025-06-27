export class UnauthorizedException extends Error {
  public readonly code = 401;

  constructor(message = 'Клиент не автоизован') {
    super(message);
  }
}

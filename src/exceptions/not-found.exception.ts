export class NotFoundException extends Error {
  public readonly code = 404;

  constructor(message = 'Вы на несуществующей странице') {
    super(message);
  }
}

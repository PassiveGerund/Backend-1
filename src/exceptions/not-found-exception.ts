export class NotFoundException extends Error {
  public readonly code = 400;

  constructor(message = 'Вы на несуществующей странице') {
    super(message);
  }
}

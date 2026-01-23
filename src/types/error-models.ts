export class GameError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'GameError';
  }
}

export class ValidationError extends GameError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends GameError {
  constructor(resource: string) {
    super('NOT_FOUND', \\ not found\, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends GameError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
  }
}

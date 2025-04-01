import { BaseError, type Jsonable } from '@features/errors';

class Unauthorized extends BaseError {
  constructor(
    message: string,
    context: { cause?: Error; context?: Jsonable } = {},
  ) {
    super(message, context);
    this.name = 'UnauthorizedError';
  }
}

export { Unauthorized };

import { BaseError, type Jsonable } from '@features/errors';

class AppSettings extends BaseError {
  constructor(
    message: string,
    context: { cause?: Error; context?: Jsonable } = {},
  ) {
    super(message, context);
    this.name = 'AppSettingsError';
  }
}

export { AppSettings };

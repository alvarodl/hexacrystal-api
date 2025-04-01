import Elysia, {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from 'elysia';

import { UnauthorizedError } from '@features/auth/errors';
import { AppSettingsError } from '@features/settings/errors';
import { StatusCodes } from 'http-status-codes';

type ErrorResponse = {
  message: string;
  cause?: unknown;
  context?: unknown;
  stack?: string;
};

const createErrorResponse = (
  message: string,
  cause?: unknown,
  context?: unknown,
  stack?: string,
): ErrorResponse => {
  return { message, cause, context, stack };
};

const errors = new Elysia()
  .error({
    UnauthorizedError,
    AppSettingsError,
    ValidationError,
    InternalServerError,
    NotFoundError,
  })
  .onError({ as: 'global' }, ({ code, error, set }) => {
    switch (code) {
      case 'UnauthorizedError':
        set.status = StatusCodes.UNAUTHORIZED;
        return createErrorResponse(
          error.message,
          error.cause,
          error.context,
          error.stack,
        );
      case 'AppSettingsError':
      case 'InternalServerError':
        set.status = StatusCodes.INTERNAL_SERVER_ERROR;
        return createErrorResponse(
          error.message,
          error.cause,
          'context' in error ? error.context : undefined,
          error.stack,
        );
      case 'ValidationError':
        set.status = StatusCodes.BAD_REQUEST;
        return createErrorResponse(error.message, error.all, null, error.stack);
      case 'NotFoundError':
        set.status = StatusCodes.NOT_FOUND;
        return createErrorResponse(
          error.message,
          error.cause,
          null,
          error.stack,
        );
      case 'UNKNOWN':
        set.status = StatusCodes.INTERNAL_SERVER_ERROR;
        return createErrorResponse(
          error.message,
          error.cause,
          null,
          error.stack,
        );
      default:
    }
  });

export { errors };

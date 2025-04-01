import { getCurrentSpan } from '@elysiajs/opentelemetry';

import { createPinoLogger, type pino } from '@bogeychan/elysia-logger';

interface LogObjectWithEventType {
  eventType: string;
  [key: string]: unknown;
}

const baseLogger = createPinoLogger({
  level: 'info',
  hooks: {
    logMethod(args: Parameters<pino.LogFn>, method: pino.LogFn, level: number) {
      const span = getCurrentSpan();

      if (span) {
        const customDimensions = args[0];

        if (
          typeof customDimensions === 'object' &&
          'eventType' in customDimensions
        ) {
          const { eventType, ...attributes } =
            customDimensions as LogObjectWithEventType;

          const message =
            args.length > 1 && typeof args[1] === 'string'
              ? args[1]
              : 'Log event';

          span.addEvent(eventType, {
            message: message,
            level: level,
            ...attributes,
          });
        }
      }

      return method.apply(this, args);
    },
  },
});

export { baseLogger };

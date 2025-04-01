import { baseLogger } from './base';

const log: Record<
  string,
  (
    eventType: string,
    message: string,
    customDimensions: Record<string, unknown> | unknown[],
  ) => void
> = {
  debug: (
    eventType: string,
    message: string,
    customDimensions: Record<string, unknown> | unknown[],
  ) => baseLogger.debug({ ...customDimensions, eventType }, message),
  trace: (
    eventType: string,
    message: string,
    customDimensions: Record<string, unknown> | unknown[],
  ) => baseLogger.trace({ ...customDimensions, eventType }, message),
  info: (
    eventType: string,
    message: string,
    customDimensions: Record<string, unknown> | unknown[],
  ) => baseLogger.info({ ...customDimensions, eventType }, message),
  warning: (
    eventType: string,
    message: string,
    customDimensions: Record<string, unknown> | unknown[],
  ) => baseLogger.warn({ ...customDimensions, eventType }, message),
  error: (
    eventType: string,
    message: string,
    customDimensions: Record<string, unknown> | unknown[],
  ) => baseLogger.error({ ...customDimensions, eventType }, message),
  fatal: (
    eventType: string,
    message: string,
    customDimensions: Record<string, unknown> | unknown[],
  ) => baseLogger.fatal({ ...customDimensions, eventType }, message),
};

export { log };

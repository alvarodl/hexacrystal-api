import { log } from './logger';

const withLogging = <
  T extends (...args: Parameters<T>) => Promise<ReturnType<T>> | ReturnType<T>,
>(
  fn: T,
  eventBaseName: string = 'function',
): ((...args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    log.info(`${eventBaseName}.enter`, `Invoking ${fn.name} function`, {
      args: JSON.stringify(args),
    });

    const result = fn(...args);

    if (result instanceof Promise) {
      return result.then((resolvedResult) => {
        log.info(`${eventBaseName}.exit`, `Function ${fn.name} invoked`, {
          response: JSON.stringify(resolvedResult ?? {}),
        });
        return resolvedResult;
      }) as ReturnType<T>;
    } else {
      log.info(`${eventBaseName}.exit`, `Function ${fn.name} invoked`, {
        response: JSON.stringify(result ?? {}),
      });
      return result;
    }
  };
};

export { withLogging };

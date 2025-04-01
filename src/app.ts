import { Elysia } from 'elysia';
import cors from '@elysiajs/cors';
import { opentelemetry } from '@elysiajs/opentelemetry';
import swagger from '@elysiajs/swagger';

import { wrap } from '@bogeychan/elysia-logger';
import { buildConfiguration as buildOpenApiConfiguration } from '@features/openapi';
import type { AppSettings } from '@features/settings';
import { buildConfiguration as buildTelemetryConfiguration } from '@features/telemetry';
import { baseLogger } from '@features/telemetry/logging/base';

import { errors } from './errors';
import { routes } from './routes';

const createApp = ({
  name,
  apiVersion,
  environment,
  port,
  openapiTitle,
  openapiDescription,
  otlpCollectorTraceUrl,
  azureMonitorConnectionString,
}: AppSettings) => {
  const otelConfig = buildTelemetryConfiguration({
    serviceName: name,
    serviceVersion: apiVersion,
    serviceEnvironment: environment,
    otlpTraceEndpoint: otlpCollectorTraceUrl,
    azureMonitorConnectionString: azureMonitorConnectionString,
  });
  const openapiConfig = buildOpenApiConfiguration({
    title: openapiTitle,
    version: apiVersion,
    description: openapiDescription,
  });

  const app = new Elysia()
    .use(errors)
    .use(cors())
    .use(swagger(openapiConfig))
    .use(opentelemetry(otelConfig))
    .use(wrap(baseLogger, { autoLogging: false }))
    .use(routes)
    .listen(port);

  return app;
};

export { createApp };

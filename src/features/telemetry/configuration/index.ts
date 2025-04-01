import type { ElysiaOpenTelemetryOptions } from '@elysiajs/opentelemetry';

import { AzureMonitorTraceExporter } from '@azure/monitor-opentelemetry-exporter';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import type { SpanProcessor } from '@opentelemetry/sdk-trace-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

import { ATTR_DEPLOYMENT_ENVIRONMENT } from '../opentelemetry';

import type { OtelConfiguration } from './domain';

const build = ({
  serviceName,
  serviceVersion,
  serviceEnvironment,
  otlpTraceEndpoint,
  azureMonitorConnectionString,
}: OtelConfiguration): ElysiaOpenTelemetryOptions => {
  const spanProcessors: SpanProcessor[] = [];

  if (otlpTraceEndpoint) {
    const otlpExporter = new OTLPTraceExporter({
      url: otlpTraceEndpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const otlpProcessor = new BatchSpanProcessor(otlpExporter);
    spanProcessors.push(otlpProcessor);
  }

  if (azureMonitorConnectionString) {
    const azureMonitorExporter = new AzureMonitorTraceExporter({
      connectionString: azureMonitorConnectionString,
    });
    const azureMonitorProcessor = new BatchSpanProcessor(azureMonitorExporter);
    spanProcessors.push(azureMonitorProcessor);
  }

  const resource = new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
    [ATTR_SERVICE_VERSION]: serviceVersion,
    [ATTR_DEPLOYMENT_ENVIRONMENT]: serviceEnvironment,
  });

  return {
    serviceName,
    spanProcessors,
    resource,
  };
};

export { build };

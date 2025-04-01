type OtelConfiguration = {
  serviceName: string;
  serviceVersion: string;
  serviceEnvironment: string;
  otlpTraceEndpoint?: string;
  azureMonitorConnectionString?: string;
};

export type { OtelConfiguration };

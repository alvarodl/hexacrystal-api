import { type AppSettings, validate } from './domain';

const appSettings: AppSettings = {
  port: Bun.env.PORT ? parseInt(Bun.env.PORT) : 3000,
  name: Bun.env.SERVICE_NAME || '',
  apiVersion: Bun.env.API_VERSION || '',
  environment: Bun.env.ENVIRONMENT || '',
  apiKey: Bun.env.API_KEY || '',
  openapiTitle: Bun.env.OPENAPI_TITLE || 'Chatbot API',
  openapiDescription:
    Bun.env.OPENAPI_DESCRIPTION || 'REST API for Chatbot Project',
  otlpCollectorTraceUrl: Bun.env.OTLP_COLLECTOR_TRACE_URL,
  azureMonitorConnectionString: Bun.env.AZURE_MONITOR_CONNECTION_STRING,
};

const getSettings = (): AppSettings => {
  validate(appSettings);
  return appSettings;
};

export { getSettings };

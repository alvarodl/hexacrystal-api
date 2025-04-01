import { type Static, t } from 'elysia';

import { Value } from '@sinclair/typebox/value';

import { AppSettingsError } from './errors';

const appSettingsSchema = t.Object({
  port: t.Number({ minimum: 0, maximum: 65535 }),
  name: t.String({ minLength: 1 }),
  apiVersion: t.String({ minLength: 1 }),
  environment: t.String({ minLength: 1 }),
  apiKey: t.String({ minLength: 1 }),
  openapiTitle: t.String({ minLength: 1 }),
  openapiDescription: t.String({ minLength: 1 }),
  otlpCollectorTraceUrl: t.Optional(t.String()),
  azureMonitorConnectionString: t.Optional(t.String()),
});

type AppSettings = Static<typeof appSettingsSchema>;

const validate = (appSettings?: AppSettings) => {
  const success = Value.Check(appSettingsSchema, appSettings);

  if (!success) {
    throw new AppSettingsError('App Settings are incorrect');
  }
};

export { type AppSettings, appSettingsSchema, validate };

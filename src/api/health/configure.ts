import Elysia from 'elysia';

import { withLogging } from '@features/telemetry/logging/withLogging';

import { handler as checkHandler } from './check';

const routes = new Elysia().get(
  'health',
  () => withLogging(checkHandler, 'health')('frita'),
  {
    detail: {
      summary: 'Check API health',
      tags: ['Health'],
    },
  },
);

export { routes };

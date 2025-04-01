import Elysia from 'elysia';

import { routes as healthRoutes } from '@api/health';
import { getSettings } from '@features/settings';

const settings = getSettings();

const routes = new Elysia()
  .get('/', `Chatbot API v${settings.apiVersion}`, {
    detail: { hide: true },
  })
  .use(healthRoutes);

export { routes };

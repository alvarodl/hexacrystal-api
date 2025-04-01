import { getSettings } from '@features/settings';

import { createApp } from './app';

const app = createApp(getSettings());

console.log(`API is running at ${app.server?.hostname}:${app.server?.port}`);

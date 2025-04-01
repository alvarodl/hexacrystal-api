import { Elysia } from 'elysia';

import { getSettings } from '@features/settings';

import { UnauthorizedException } from './exceptions';

const isValidKey = (key: string) => key === getSettings().apiKey;

const auth = () =>
  new Elysia({
    name: '@hexacrystal/api-key-auth',
  }).onTransform({ as: 'scoped' }, ({ request }) => {
    const apiKey = request.headers.get('x-api-key') || '';
    if (!isValidKey(apiKey)) {
      throw new UnauthorizedException('Missing or invalid API Key', {
        context: apiKey,
      });
    }
  });

export { auth };

import type { ElysiaSwaggerConfig } from '@elysiajs/swagger';

import type { OpenApiConfiguration } from './domain';

const build = ({
  title,
  version,
  description,
}: OpenApiConfiguration): ElysiaSwaggerConfig => {
  return {
    scalarVersion: '1.25.74',
    documentation: {
      info: {
        title: title,
        version: version,
        description: description,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key',
            description: 'API Key for Authentication',
          },
        },
      },
    },
    scalarConfig: {
      metaData: {
        author: 'Álvaro Domínguez López',
        title: title,
        description: description,
      },
    },
  };
};

export { build };

import jsLint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsLint from 'typescript-eslint';

export default [
  jsLint.configs.recommended,
  ...tsLint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  eslintPluginPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
  },
  {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^elysia', '^@elysiajs'],
            ['^@?\\w'],
            ['^(\\u0000|@?\\w)(/.*|$)'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/extensions': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-console': 'off',
      'no-control-regex': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
    },
  },
];

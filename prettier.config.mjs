import baseConfig from '@ur-apps/common/prettier';

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  importOrder: [
    '',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^(constants|schemas|types|utils)(/.*)?$',
    '',
    '^\\.\\./',
    '',
    '^\\./',
  ],
};

export default config;

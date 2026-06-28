import config, { pluginNames } from '@mephisto5558/eslint-config';

export default [
  ...config,
  {
    name: 'overwrite:tests',
    files: ['tests/**/*.ts'],
    rules: {
      [`${pluginNames.import}/no-unassigned-import`]: 'off',
      [`${pluginNames.unicorn}/no-null`]: 'off',
      [`${pluginNames.sonar}/no-empty-collection`]: 'off'
    }
  }
] as typeof config;
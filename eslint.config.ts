import config, { allFilesGlob, pluginNames, tsGlob } from '@mephisto5558/eslint-config';

export default [
  ...config,
  {
    name: 'overwrite:src',
    files: [`src/${allFilesGlob}${tsGlob}`],
    rules: {
      [`${pluginNames.typescript}/consistent-type-definitions`]: 'off',
      [`${pluginNames.sonar}/no-built-in-override`]: 'off'
    }
  },
  {
    name: 'overwrite:tests',
    files: [`tests/${allFilesGlob}${tsGlob}`],
    rules: {
      [`${pluginNames.import}/no-unassigned-import`]: 'off',
      [`${pluginNames.unicorn}/no-null`]: 'off',
      [`${pluginNames.sonar}/no-empty-collection`]: 'off'
    }
  }
] as typeof config;
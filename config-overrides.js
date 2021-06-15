// eslint-disable-next-line import/no-extraneous-dependencies
const { addBabelPlugin, override } = require('customize-cra');
const jestConfig = require('./jest.config.js');

module.exports = {
  webpack: override(
    addBabelPlugin([
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
      },
    ])
  ),
  jest: config => {
    return { ...config, ...jestConfig };
  },
};

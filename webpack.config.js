const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack/common/config.common');

const developmentConfig = require('./webpack/config.dev');
const productionConfig = require('./webpack/config.prod');
const styleguideConfig = require('./webpack/config.styleguide');

const developmentConfigDevServer = require('./webpack/config.dev-server');
const developmentConfigDevClient = require('./webpack/config.dev-client');

const PATHS = {
  root: __dirname,
  webpack: path.join(__dirname, 'webpack'),
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'WEB-INF')
};

module.exports = (env) => {
  const babelenv = env.production ? 'production' : 'development';

  process.env.BABEL_ENV = babelenv;

  if (env.devserver) {
    return merge(commonConfig(PATHS), developmentConfigDevServer(PATHS))
  }

  if (env.devclient) {
    return merge(commonConfig(PATHS), developmentConfigDevClient(PATHS))
  }

  if (babelenv === 'production') {
    return merge(commonConfig(PATHS), productionConfig(PATHS))
  }

  if (env === "styleguide") {
    return styleguideConfig(PATHS)
  }

  return merge(commonConfig(PATHS), developmentConfig(PATHS));
};

/* eslint-disable global-require */

/**
 * Front-end middleware
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  app.use(
    '/smsgateway/api/v1',
    createProxyMiddleware({ target: 'http://52.76.217.79:8080' }),
  );
  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};

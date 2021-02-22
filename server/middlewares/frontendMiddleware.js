/* eslint-disable global-require */

/**
 * Front-end middleware
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  app.use(
    '/',
    createProxyMiddleware(['/customergateway', '/smsgateway', '/upload'], {
      target: 'https://dev.sgft.info',
      changeOrigin: true,
    }),
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

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://jobtracker-production-5259.up.railway.app',
      changeOrigin: true,
    })
  );
};
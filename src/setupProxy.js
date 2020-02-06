const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/openapi', {
      target: 'http://openapi.11st.co.kr',
      changeOrigin: true,
    })
  );
  app.use(
    proxy('/v1', {
      target: 'https://openapi.naver.com',
      changeOrigin: true,
    })
  );
};
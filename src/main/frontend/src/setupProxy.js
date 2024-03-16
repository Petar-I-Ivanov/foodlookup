const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/login", "/do-login", "/logout"],
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      xfwd: true,
    })
  );
  app.listen(3000);
};
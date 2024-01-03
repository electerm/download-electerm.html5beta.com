const { createProxyMiddleware } = require('http-proxy-middleware')
const app = require('express')()
app.disable('x-powered-by')

const {
  TARGET_URL = 'https://github.com',
  PATH_START = '/electerm/electerm/releases/download/'
} = process.env

const filter = function (pathname, req) {
  console.log('pathname', pathname, '/download' + PATH_START)
  return pathname.startsWith('/download' + PATH_START) &&
    req.method === 'GET'
}

const opts = {

  target: TARGET_URL,
  followRedirects: true,
  pathRewrite: function (path, req) { return path.replace('/download', '/') }
  // protocolRewrite: true,
  // autoRewrite: true,
  // changeOrigin: false,
  // hostRewrite: true,
}

app.use(
  '/download',
  createProxyMiddleware(filter, opts)
)

app.get(
  '/',
  (req, res) => res.send('ok')
)

module.exports = app

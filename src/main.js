const { createProxyMiddleware } = require('http-proxy-middleware')
const app = require('express')()
app.disable('x-powered-by')

const {
  TARGET_URL = 'https://github.com',
  PATH_START = '/electerm/electerm/releases/download/'
} = process.env

const filter = function (pathname, req) {
  return pathname.startsWith(PATH_START) &&
    req.method === 'GET'
}

const opts = {
  target: TARGET_URL,
  // followRedirects: true,
  changeOrigin: true,
  // pathRewrite: function (path, req) { return path.replace('/download', '/') },
  followRedirects: true,
  // Define the handleProxyResponse function
  onProxyRes: function handleProxyResponse (proxyRes, req, res) {
    if (proxyRes.statusCode === 302) {
      const redirectUrl = proxyRes.headers.location
      const oneYearInSeconds = 365 * 24 * 60 * 60
      const cacheControl = `public, max-age=${oneYearInSeconds}`
      const expires = new Date(Date.now() + oneYearInSeconds * 1000).toUTCString()
      res.set('Cache-Control', cacheControl)
      res.set('Expires', expires)
      res.redirect(redirectUrl)
    }
  }
}

app.use(
  '/',
  createProxyMiddleware(filter, opts)
)

app.get(
  '/test',
  (req, res) => res.send('ok')
)

module.exports = app

const proxy = require('express-http-proxy')
const app = require('express')()
app.disable('x-powered-by')

const {
  TARGET_URL = 'https://github.com',
  PATH_START = '/electerm/electerm/releases/download/'
} = process.env

const check = {
  filter: (req, res) => {
    return req.path.startsWith(PATH_START)
  },
  limit: '200mb',
  userResHeaderDecorator: (headers, userReq, userRes, proxyReq, proxyRes) => {
    // recieves an Object of headers, returns an Object of headers.
    return headers
  },
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    return proxyReqOpts
  }
}

app.use(
  '/download',
  proxy(TARGET_URL, check)
)

app.get(
  '/',
  (req, res) => res.send('ok')
)

module.exports = app

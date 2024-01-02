const proxy = require('express-http-proxy')
const app = require('express')()

const {
  TARGET_URL = 'https://github.com',
  PATH_START = '/electerm/electerm/releases/download/'
} = process.env

const check = {
  filter: (req, res) => {
    return req.method === 'GET' &&
      req.path.startsWith(PATH_START)
  },
  limit: '200mb',
  userResHeaderDecorator: (headers, userReq, userRes, proxyReq, proxyRes) => {
    // recieves an Object of headers, returns an Object of headers.
    console.log(headers)
    return headers
  }
}

app.use(
  '/download',
  proxy(TARGET_URL, check)
)

module.exports = app

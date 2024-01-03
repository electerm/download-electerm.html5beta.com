const express = require('express')
const app = express()
const { resolve } = require('path')

const {
  HOST_TEST = '127.0.0.1',
  PORT_TEST = 24565
} = process.env

app.use(
  express.static(
    resolve(__dirname, '../')
  )
)

app.get(
  '/temp/api/f.js',
  (req, res) => res.send('f.js')
)

app.get(
  '/temp/api/f1.js',
  (req, res) => res.redirect('/temp/api/f.js')
)

app.listen(PORT_TEST, HOST_TEST, () => {
  console.log(`server is running at http://${HOST_TEST}:${PORT_TEST}`);
})

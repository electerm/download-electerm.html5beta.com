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
app.listen(PORT_TEST, HOST_TEST, () => {
  console.log(`server is running at http://${HOST_TEST}:${PORT_TEST}`);
})
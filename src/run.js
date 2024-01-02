require('dotenv').config()
const app = require('./main.js')

const {
  HOST = '127.0.0.1',
  PORT = 3000
} = process.env

app.listen(PORT, HOST, () => {
  console.log(`server is running at http://${HOST}:${PORT}`)
})

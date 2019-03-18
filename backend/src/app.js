require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const cors = require('cors')

class AppController {
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    // enable request/response in JSON format
    this.express.use(express.json())
    // enable CORS
    this.express.use(cors())
  }

  routes() {
    // set API routes
    this.express.use(require('./routes'))
  }
}

module.exports = new AppController().express
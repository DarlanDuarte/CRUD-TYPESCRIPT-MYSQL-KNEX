import express from 'express'
import cors from 'cors'
import router from './router/router'

class App {
  app: express.Application

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes() {
    this.app.use(router)
  }
}

export default new App().app

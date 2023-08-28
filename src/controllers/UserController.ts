import { Request, Response } from 'express'
import database from '../database/connection'
import UserModels from '../models/UserModels'

class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const { name, lastName, email, password } = req.body

      const user = await UserModels.createUser({ name, lastName, email, password })

      if (user.msg) return res.status(404).json(user.msg)

      if (user.invalid) return res.status(409).json(user.invalid)

      return res.status(201).json({ Usuario: user.data })
    } catch (e: any) {
      return res.status(500).json({ error: `Error interno no servidor` })
    }
  }
}

export default new UserController()

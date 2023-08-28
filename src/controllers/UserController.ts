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

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModels.getUsers()

      return res.status(200).json(users)
    } catch (e: any) {
      return res.status(500).json({ error: `Error interno no Servidor` })
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params

      const result = await UserModels.deleteUser({ id })

      if (result.invalid) return res.status(400).json(result.invalid)
      if (result.msg) return res.status(400).json(result.msg)

      return res.status(200).json({ message: `Usuário Deletado com sucesso!` })
    } catch (e: any) {
      return res.status(500).json({ message: `Error interno no Servidor` })
    }
  }
}

export default new UserController()

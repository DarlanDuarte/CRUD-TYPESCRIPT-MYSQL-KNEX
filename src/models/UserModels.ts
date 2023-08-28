import database from '../database/connection'
import { IDataCreate } from '../interfaces/interfaces'

class UserModels {
  public async createUser({ name, lastName, email, password }) {
    try {
      if (!name || !lastName || !email || !password) {
        return { invalid: `Suas Credenciais não foram passadas corretamente!` }
      }

      const ExistUser = await database.select('*').table('users').where({ email: email })
      //ExitUser retorna um array vazio

      if (ExistUser.length > 0) return { msg: `Usuário já existe!` }

      await database.table('users').insert({ name, lastName, email, password })

      const data: IDataCreate[] = await database.select('*').table('users').where({ email })

      console.log(data)

      return {
        data,
      }
    } catch (e: any) {
      throw new Error(`Error: Algo deu Errado!`, e.message)
    }
  }
}

export default new UserModels()

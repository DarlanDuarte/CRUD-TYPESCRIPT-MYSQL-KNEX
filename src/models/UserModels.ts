import database from '../database/database'
import { IDataCreate, IUpdateUser } from '../interfaces/interfaces'

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
      throw new Error(`Error: Algo deu Errado!`)
    }
  }

  public async getUsers() {
    const users = await database.select(['name', 'lastName', 'email']).table('users')
    return {
      users,
    }
  }

  public async deleteUser({ id }) {
    if (!id) return { invalid: `Usuário não foi passado` }

    const user = await database.table('users').where({ id }).del()

    if (user !== 1) return { msg: `Usuário não existe!` }

    return {
      user,
    }
  }

  public async updateUser({ name, lastName, email, password }) {
    if (!name || !lastName || !email || !password)
      return { invalid: `Suas Credenciais de Atualização não foram passadas corretamente!` }

    const userUpdate = await database
      .table('users')
      .where({ email })
      .update({ name: name, lastName: lastName, password: password })

    if (userUpdate === 0) return { message: `Usuário não existe!` }

    const user: IUpdateUser[] = await database
      .select(['id', 'name', 'lastName', 'email'])
      .table('users')
      .where({ email })

    console.log(user)
    return { user }
  }
}

export default new UserModels()

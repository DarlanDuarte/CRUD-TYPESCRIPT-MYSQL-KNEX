import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const database = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: parseInt(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  },
})

export default database

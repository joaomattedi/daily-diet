import { app } from './app'
import { knex } from './database'
import { env } from './env'

app.get('/', async () => {
  const tables = await knex('sqlite_schema').select()

  return tables
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running!')
  })

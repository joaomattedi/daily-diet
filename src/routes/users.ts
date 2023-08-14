import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (req) => {
    const users = await knex('users').select()

    return { users }
  })

  app.post('/', async (req, res) => {
    const createUserBodySchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { firstName, lastName, email, password } = createUserBodySchema.parse(
      req.body,
    )

    await knex('users').insert({
      uuid: randomUUID(),
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    })

    return res.status(201).send()
  })
}

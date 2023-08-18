import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function loginRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const loginBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = loginBodySchema.parse(req.body)

    const user = await knex('users')
      .where('email', email)
      .andWhere('password', password)
      .first()

    if (!user) {
      return res.status(401).send('User not found')
    }

    const sessionId = user.uuid

    res.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 12, // 12 hours
    })

    return res.status(200).send('Login success')
  })
}

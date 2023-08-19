import { FastifyInstance } from 'fastify'
import { boolean, string, z } from 'zod'
import { knex } from '../database'

export async function mealsRoute(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const mealBodySchema = z.object({
      name: string(),
      description: string().optional(),
      mealTime: string(),
      allowedEat: boolean(),
    })

    const { name, description, mealTime, allowedEat } = mealBodySchema.parse(
      req.body,
    )

    const { sessionId } = req.cookies

    if (!sessionId) {
      return res.status(401).send('User not logged')
    }

    const meal = await knex('meals').insert({
      allowed_eat: allowedEat,
      description,
      meal_time: mealTime,
      name,
      user_uuid: sessionId,
    })

    return res.status(200).send(meal)
  })
}

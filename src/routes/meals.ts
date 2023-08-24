import { FastifyInstance } from 'fastify'
import { boolean, string, z } from 'zod'
import { knex } from '../database'
import { calculateBiggerSequence } from '../utils/ArrayUtils'

export async function mealsRoute(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const mealBodySchema = z.object({
      name: string(),
      description: string().optional(),
      mealTime: string(),
      allowedEat: boolean(),
      mealDate: string(),
    })

    const { name, description, mealTime, allowedEat, mealDate } =
      mealBodySchema.parse(req.body)

    const { sessionId } = req.cookies

    if (!sessionId) {
      return res.status(401).send('User not logged')
    }

    await knex('meals').insert({
      allowed_eat: allowedEat,
      description,
      meal_time: mealTime,
      name,
      user_uuid: sessionId,
      meal_date: new Date(mealDate),
    })

    return res.status(200).send()
  })
  app.get('/', async (req, res) => {
    const { sessionId } = req.cookies

    if (!sessionId) {
      return res.status(401).send('User not logged')
    }

    const meals = await knex('meals').where('user_uuid', sessionId).select()

    return res.status(200).send({
      meals: meals.map((e) => ({ ...e, meal_date: new Date(e.meal_date) })),
    })
  })
  app.get('/:id', async (req, res) => {
    const { sessionId } = req.cookies

    if (!sessionId) {
      return res.status(401).send('User not logged')
    }

    const getMealParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = getMealParamsSchema.parse(req.params)

    const meal = await knex('meals').where('id', id).first()

    return res.status(200).send({
      meal,
    })
  })
  app.delete('/:id', async (req, res) => {
    const { sessionId } = req.cookies

    if (!sessionId) {
      return res.status(401).send('User not logged')
    }

    const getMealParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = getMealParamsSchema.parse(req.params)

    await knex('meals').where('id', id).del()

    return res.status(200).send()
  })
  app.get('/summary', async (req, res) => {
    const { sessionId } = req.cookies

    if (!sessionId) {
      return res.status(401).send('User not logged')
    }

    const meals = await knex('meals').where('user_uuid', sessionId).select()

    const summary = {
      totalMeals: meals.length,
      totalOnDiet: meals.filter((meal) => meal.allowed_eat).length,
      totalOffDiet: meals.filter((meal) => !meal.allowed_eat).length,
      maxSequenceOnDietMeals: calculateBiggerSequence(meals),
    }

    return res.status(200).send({
      summary,
    })
  })
}

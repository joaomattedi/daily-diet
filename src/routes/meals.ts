import { FastifyInstance } from 'fastify'

export async function mealsRoute(app: FastifyInstance) {
  app.get('/', async (_req, res) => {
    return res.status(200).send('Route working')
  })
}

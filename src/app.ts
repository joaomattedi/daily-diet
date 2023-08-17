import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { loginRoutes } from './routes/login'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)

app.register(usersRoutes, {
  prefix: 'users',
})

app.register(loginRoutes, {
  prefix: 'login',
})

// eslint-disable-next-line
import { knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      uuid: string
      id: string
      first_name: string
      last_name: string
      email: string
      password: string
      created_at: string
      updated_at: string
    }
    meals: {
      id: string
      name: string
      description: string
      meal_date: Date
      meal_time: string
      allowed_eat: boolean
      user_uuid: string
    }
  }
}

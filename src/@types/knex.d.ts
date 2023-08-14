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
  }
}

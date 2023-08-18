import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.increments('id').primary()
    table.text('name').notNullable()
    table.text('description')
    table.date('meal_date').notNullable()
    table.time('meal_time').notNullable()
    table.boolean('allowed_eat').defaultTo(false)
    table.uuid('user_uuid').unsigned().notNullable()
    table.foreign('user_uuid').references('users.uuid')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('meals')
}


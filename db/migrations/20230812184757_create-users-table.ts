import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users',(table) => {
    table.uuid('uuid').primary()
    table.increments('id').notNullable()
    table.text('first_name').notNullable()
    table.text('last_name').notNullable()
    table.text('email').notNullable()
    table.text('password').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}


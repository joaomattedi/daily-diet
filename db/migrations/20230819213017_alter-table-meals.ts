import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    table.renameColumn('meal_date', 'created_at');
    table.timestamp('created_at').defaultTo(knex.fn.now()).alter();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    table.dropTimestamps();
    table.renameColumn('created_at', 'meal_date');
    table.date('meal_date').alter();
  })
}


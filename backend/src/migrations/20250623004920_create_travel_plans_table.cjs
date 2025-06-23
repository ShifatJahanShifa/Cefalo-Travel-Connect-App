exports.up = async function(knex) {
  await knex.schema.createTable('travel_plans', (table) => {
    table.uuid('travel_plan_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.integer('planner_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE');
    
    table.date('start_date');
    table.date('end_date');
    table.text('note');
    table.decimal('estimated_cost', null, 2);

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('travel_plan_places', (table) => {
    table.increments('travel_plan_place_id').primary();
    
    table.uuid('travel_plan_id').unsigned().notNullable()
      .references('travel_plan_id').inTable('travel_plans').onDelete('CASCADE');
    
    table.integer('place_id').unsigned().notNullable()
      .references('place_id').inTable('places').onDelete('CASCADE');
  });

  await knex.schema.createTable('travel_plan_accommodations', (table) => {
    table.increments('travel_plan_accommodation_id').primary();
    
    table.uuid('travel_plan_id').unsigned().notNullable()
      .references('travel_plan_id').inTable('travel_plans').onDelete('CASCADE');
    
    table.integer('accommodation_id').unsigned().notNullable()
      .references('accommodation_id').inTable('accommodations').onDelete('CASCADE');
  });

  await knex.schema.createTable('travel_plan_transports', (table) => {
    table.increments('travel_plan_transport_id').primary();
    
    table.uuid('travel_plan_id').unsigned().notNullable()
      .references('travel_plan_id').inTable('travel_plans').onDelete('CASCADE');
    
    table.integer('transport_id').unsigned().notNullable()
      .references('transport_id').inTable('transports').onDelete('CASCADE');
  });
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('travel_plan_transports');
    await knex.schema.dropTableIfExists('travel_plan_accommodations');
    await knex.schema.dropTableIfExists('travel_plan_places');
    await knex.schema.dropTableIfExists('travel_plans');
}
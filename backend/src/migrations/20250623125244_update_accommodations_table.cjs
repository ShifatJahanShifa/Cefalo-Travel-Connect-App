exports.up = async function(knex) {
  
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Drop the existing table (assuming you're okay with losing current data)
    await knex.schema.dropTableIfExists('accommodations');

    // Recreate with UUID and no cost_per_night column
    await knex.schema.createTable('accommodations', (table) => {
        table.uuid('accommodation_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.enu('accommodation_type', ['hotel', 'motel', 'resort', 'villa', 'cottage']).notNullable();
        table.string('accommodation_name').notNullable();
        table.specificType('location', 'GEOGRAPHY(Point, 4326)').notNullable();
    });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('accommodations');
};

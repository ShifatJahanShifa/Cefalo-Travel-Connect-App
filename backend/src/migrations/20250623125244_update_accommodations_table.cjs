exports.up = async function(knex) {
  
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

   
    await knex.schema.dropTableIfExists('accommodations');

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

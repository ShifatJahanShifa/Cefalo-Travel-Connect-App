exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.dropTableIfExists('places');

  await knex.schema.createTable('places', (table) => {
    table.uuid('place_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('place_name').notNullable();

    // Assumes you're using PostGIS for geolocation
    table.specificType('location', 'GEOGRAPHY(Point, 4326)').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('places');
};

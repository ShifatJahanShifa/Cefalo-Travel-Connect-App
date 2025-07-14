exports.up = async function (knex) {
  await knex.schema.alterTable('places', (table) => {
    table.dropForeign(['geo_location_id'])
    table.dropColumn('geo_location_id')
  });

  await knex.schema.alterTable('places', (table) => {
    table.specificType('location', 'GEOGRAPHY(Point, 4326)').notNullable()
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('places', (table) => {
    table.dropColumn('location').notNullable()
    table.integer('geo_location_id')
  });

  await knex.schema.alterTable('places', (table) => {
    table
      .foreign('geo_location_id')
      .references('geo_location_id')
      .inTable('geo_locations')
      .onDelete('CASCADE');
  });
};

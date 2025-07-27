exports.up = async function (knex) {
  await knex.schema.alterTable('transports', (table) => {
    table.dropColumn('starting_location_id')
    table.dropColumn('ending_location_id')
    // Rename column
    table.renameColumn('transport_provider', 'transport_name');

    // Add new location name columns
    table.string('starting_location_name').notNullable();
    table.string('ending_location_name').notNullable();

    // Add PostGIS geography point columns
    table.specificType('starting_location', 'GEOGRAPHY(Point, 4326)').notNullable();
    table.specificType('ending_location', 'GEOGRAPHY(Point, 4326)').notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('transports', (table) => {
    // Drop added columns
    table.dropColumn('starting_location_name').notNullable();
    table.dropColumn('ending_location_name').notNullable();
    table.dropColumn('starting_location').notNullable();
    table.dropColumn('ending_location').notNullable();

    // Rename back to original
    table.renameColumn('transport_name', 'transport_provider');

    // Re-add FK columns
    table.integer('starting_location_id').notNullable();
    table.integer('ending_location_id').notNullable();
  });

  // Re-add foreign key constraints
  await knex.schema.alterTable('transports', (table) => {
    table
      .foreign('starting_location_id')
      .references('geo_location_id')
      .inTable('geo_locations')
      .onDelete('CASCADE');

    table
      .foreign('ending_location_id')
      .references('geo_location_id')
      .inTable('geo_locations')
      .onDelete('CASCADE');
  });
};

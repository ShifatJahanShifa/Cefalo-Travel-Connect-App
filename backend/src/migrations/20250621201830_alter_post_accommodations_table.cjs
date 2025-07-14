exports.up = async function(knex) {
  // First ensure a clean state: create the correct foreign key
  await knex.schema.alterTable('post_accommodations', (table) => {
    table
      .integer('accommodation_id')
      .notNullable()
      .references('accommodation_id')
      .inTable('accommodations')
      .onDelete('CASCADE')
      .alter(); // Use .alter() to modify the existing column’s foreign key
  });
};

exports.down = async function(knex) {
  // Drop the FK pointing to accommodations and restore FK to hotels
  await knex.schema.alterTable('post_accommodations', (table) => {
    table.dropForeign('accommodation_id');
  });

  await knex.schema.alterTable('post_accommodations', (table) => {
    table
      .foreign('accommodation_id')
      .references('hotel_id')
      .inTable('hotels')
      .onDelete('CASCADE');
  });
};

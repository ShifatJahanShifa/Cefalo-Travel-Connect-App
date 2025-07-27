exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.dropTableIfExists('transports');

  await knex.schema.createTable('transports', (table) => {
    table.uuid('transport_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    
    table.enu('transport_type', ['bus', 'car', 'train', 'flight', 'boat']) // add values as needed
      .notNullable();

    table.string('transport_name').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('transports');
};

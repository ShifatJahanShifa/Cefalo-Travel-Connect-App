
exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('proximity', (table) => {
    table.uuid('proximity_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');

    table.enu('type', ['wishlist', 'place', 'accommodations', 'restaurants'])
      .notNullable();

    table.uuid('reference_id'); // could reference other entities dynamically

    table.decimal('radius', 10, 2).notNullable(); // You can adjust precision
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('proximity');
};

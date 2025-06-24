exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.dropTableIfExists('users');

  await knex.schema.createTable('users', (table) => {
    table.uuid('user_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username', 50).unique().notNullable();
    table.string('email', 254).unique().notNullable();
    table.string('hashed_password', 65).notNullable();
    table.string('phone_no', 16);
    table.enu('role', ['explorer', 'traveller', 'admin']).notNullable().defaultTo('explorer');
    table.string('profile_picture_url');
    table.text('bio');
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};

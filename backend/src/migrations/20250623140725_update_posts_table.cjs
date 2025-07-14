exports.up = async function(knex) {
  await knex.schema.alterTable('posts', (table) => {
    table.uuid('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable('posts', (table) => {
    table.dropForeign('user_id');
    table.dropColumn('user_id');
  });
};

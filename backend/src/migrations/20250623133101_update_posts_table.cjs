exports.up = async function(knex) {
  await knex.schema.alterTable('posts', (table) => {
    table.dropForeign('user_id');
    table.dropColumn('user_id');
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable('posts', (table) => {
    table.integer('user_id');
  });
};

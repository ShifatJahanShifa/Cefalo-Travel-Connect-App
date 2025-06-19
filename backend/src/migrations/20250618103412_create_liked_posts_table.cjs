exports.up = function(knex) {
  return knex.schema.createTable('liked_posts', (table) => {
    table.integer('post_id').notNullable();
    table.integer('user_id').notNullable();

    table.primary(['post_id', 'user_id']);

    table.foreign('post_id')
      .references('post_id')
      .inTable('posts')
      .onDelete('CASCADE');

    table.foreign('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('liked_posts');
};
